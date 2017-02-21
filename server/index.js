import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mergeLocationAndDescription from './handlers/location_handlers/locations_handler';
import * as userValidity from './handlers/user_handlers/signUpValidity';
import verifyPassword from './handlers/user_handlers/verifyPassword';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
app.use(passport.initialize())

const localConnection = {
  database: 'localize'
}

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || localConnection
});

app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());

// save new map

app.post('/map', (req, res) => {
  const content = req.body[0];
  const { feature, lat_long } = content;
  let saved_location_id;

  knex('locations')
    .where('name', content.feature.properties.name)
    .andWhere('lat_long', [content.lat_long.lat, content.lat_long.lng])
    .then(location => {
      if (!location[0]) {
        knex('locations').insert({
          name: feature.properties.name,
          address: null,
          lat_long: [lat_long.lat, lat_long.lng]
        }).returning('id').then(id => {
          console.log('New location saved with id ', id);
          return saved_location_id = id;
        }).catch(() => console.log('Error saving new location.'))
      } else {
        console.log('Location found.')
        return saved_location_id = location[0].id;
      }
      console.log('saved_location_id', saved_location_id);
      return saved_location_id;
    })
    .then(() => {
      content.tag_array.forEach(user_tag => {
        knex('tags').insert({ tag: user_tag }).then(tag => {
          console.log('Success — tag saved.');
        }).catch(() => {
          console.error('Tag not saved. This tag already exists.');
        });
      });
      return null;
    }).then(() => {
      content.tag_array.map(tag => {
        knex('tags').where('tag', tag).then(selected => {
          knex('locations_users_tags').insert({
            location_id: saved_location_id,
            tag_id: selected[0].id,
            user_id: content.user_id
          }).then(() => console.log('Relation saved.'))
          .catch(error => console.error('Error saving relation: ', error))
        });
      });
      return null;
    });
  return res.status(201);
});

passport.use(new Strategy(
  function(token, callback) {
    knex('users').where('token', token).then((user) => {
      if (!user) { return callback(null, false); }
      return callback(null, user);
    }).catch((err) => {
      console.log(err);
      return callback(err);
    });
  }
));

//sign in existing users

app.post('/signin', (req, res, next) => {
  const { emailOrUsername, password } = req.body;

  if (!userValidity.allFormFieldsFilledIn(req.body)) {
    return res.status(422).json({message: "All fields are required."})
  } else {
      knex('users').where('email', emailOrUsername).orWhere('username', emailOrUsername).then((user) => {
        if(!user[0]) {return res.status(401).json({message: "The email or username you entered is incorrect."})}
        if (verifyPassword(password, user[0].salt, user[0].password)) {
          const { first_name, last_name, id, bio, image, username, token, email } = user[0];
          return res.status(200).json({
            first_name, 
            last_name, 
            id, 
            bio, 
            image, 
            username,
            token, 
            email
          });
        } else {
          return res.status(401).json({message: "The password you entered is incorrect."})
        }
      })
    }
})

//sign up new users, encrypt their passwords

app.post('/signup', (req, res) => {
  const user = req;
  const { password, email, username } = req.body;
  const passwordToSave = bcrypt.hashSync(password, salt)
  const token = bcrypt.hashSync(email);
  const userValidityCheck = userValidity.signUpValidity(user)

  if (userValidityCheck.isInvalid) {
    return res.status(userValidityCheck.status).json({ message: userValidityCheck.message });
  }

  //check to see if username or email is already taken, if not create user

  knex('users').where('email', email).then((user) => {
    if (user.length > 0) {
       return res.status(409).json({message: "That email address is already on file. Try signing in."})
    }
  });

  knex('users').where('username', username).then((user) => {
    if (user.length > 0) {
      return res.status(409).json({message: "Username is already taken."})
    }
    else {
      knex.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        username: req.body.username,
        password: passwordToSave,
        salt: salt,
        token: token
      }).into('users')
      .then(() => {
        knex('users').where('username', req.body.username)
        .then((user) => {
          const { first_name, last_name, id, bio, image, username, token, email } = user[0];
          return res.status(201).json({
            first_name, 
            last_name, 
            id, 
            bio, 
            image, 
            username,
            token, 
            email
          });
        })
      }).catch(err => {
          console.error(err); 
          return res.sendStatus(500); 
      });
    }
  });
});

//sign out a user 

app.post('/logout', passport.authenticate('bearer', { session: false }), (req, res) => {
  return res.sendStatus(200);
});

//update user account info

app.put('/account/:userId/update', passport.authenticate('bearer', {session: false}), (req, res) => {
  let { userId } = req.params;
  console.log('req body', req.body) 

  knex('users').where('id', userId)
  .update(req.body)
  .into('users').then(() => {
    return knex('users').where('id', userId)
    .then((user) => {
      const { first_name, last_name, id, bio, image, username, token, email } = user[0];
      return res.status(201).json({
        first_name, 
        last_name, 
        id, 
        bio, 
        image, 
        username,
        token, 
        email
      });
    })
  }).catch(err => {
    console.error(err); 
    return res.status(500).json({err}); 
  })
}); 

// get all locations

app.get('/locations', (req, res) => {
  knex('locations').then((locations) => {
    return res.status(200).json(locations);
  });
});

// get all reviews

app.get('/reviews', (req,res) => {
  knex('reviews').then((reviews) => {
    return res.status(200).json(reviews);
  });
});

// get all locations with reviews

app.get('/locations/reviews', (req, res) => {
  knex('locations').then((locations) => {
    knex('reviews').then((reviews) => {
      let merged = mergeLocationAndDescription(locations, reviews);
      return res.status(200).json(merged);
    });
  });
});

// get all tags

app.get('/tags', (req, res) => {
  knex('tags').then((tags) => {
    return res.status(200).json(tags);
  });
});

// get all data from location_tags

app.get('/locations/tags', (req,res) => {
  knex('locations_users_tags').then((location_user_tags) => {
      return res.status(200).json(location_user_tags);
  });
});

// get all locations with that tag

app.get('/locations/:tag', (req, res) => {
  const { tag } = req.params;
  knex('tags').where({tag}).select('user_id')
  .then((data) => {
    knex('locations').whereIn('user_id', data[0].user_id)
    .then((locations) => {
      return res.status(200).json(locations);
    });
  });
});

// get all users with that tag

app.get('/users/:tag', (req, res) => {
  const { tag } = req.params;
  knex('tags').where({tag}).select('user_id')
  .then((data) => {
    knex('users').whereIn('id', data[0].user_id)
    .then((users) => {
      console.log(users)
      return res.status(200).json(users);
    });
  });
});

// get all users

app.get('/users', (req, res) => {
  knex('users').then((users) => {
    return res.status(200).json(users);
  });
});

// get all location id/user ids/tag ids

app.get('/locations/users/tags', (req, res) => {
  knex('locations_users_tags').then((data) => {
    return res.status(200).json(data);
  });
});

function runServer() {
  return new Promise((resolve, reject) => {
    app.listen(PORT, HOST, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      const host = HOST || 'localhost';
      console.log(`Listening on ${host}:${PORT}`);
    });
  });
}

if (require.main === module) {
  runServer();
}
