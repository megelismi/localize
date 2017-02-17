import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mergeLocationAndDescription from './handlers/location_handlers/locations_handler';
import userNameAndPasswordArePresent from './handlers/user_handlers/userValidity';
import verifyPassword from './handlers/user_handlers/verifyPassword';
import passport from 'passport';
// import { BasicStrategy } from 'passport-http';
// import { LocalStrategy } from 'passport-local';
import { Strategy } from 'passport-http-bearer';
import bcrypt from 'bcryptjs';
const secret = "localize";

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

// passport.use(new Strategy(
//   function(token, callback) {
//     knex('user').where('token', token).then(() => {
//       if (!user) { return callback(null, false); }
//       return callback(null, user);
//     }).catch(err) {
//       console.log(err); 
//       return callback(err);
//     }
//   });
// }));

// passport.use(new BasicStrategy(
//   function(emailOrUsername, password, done) {
//     knex('users').where('email', emailOrUsername).orWhere('username', emailOrUsername).then((user) => {
//       if (!user) { return done(null, false); }
//       if (verifyPassword(password, user.salt, user.password)) { return done(null, false); }
//       return done(null, user);
//     })
//     .catch((err) => {
//       console.log(err); 
//       done(err)
//     })
//   }
// ));


//TODO: add error handling to /signin endpoint
//TODO: confirm that a user with the username does not already exist in the db
//authenticate

//sign in existing users

app.post('/signin', (req, res, next) => {
  const { emailOrUsername, password } = req.body; 
  knex('users').where('email', emailOrUsername).orWhere('username', emailOrUsername).then((user) => {
    if(!user[0]) {return res.status(401).json({message: "User not found"})}
    if (verifyPassword(password, user[0].salt, user[0].password)) {
      const { first_name, last_name, id, bio, image, username, token } = user[0];
      const checkedInUser = {
        first_name, 
        last_name, 
        id, 
        bio, 
        image, 
        username, 
        token
      }
      return res.status(200).json({checkedInUser});
    }
    else {
      return res.status(401).json({message: 'Unauthorized'})
    }
  })
})

//sign up new users, encrypt their passwords

app.post('/signup', (req, res) => {
  const user = req; 
  const { password, email, username } = req.body;
  const passwordToSave = bcrypt.hashSync(password, salt)
  const token = bcrypt.hashSync(email);
  const userNameAndPassword = userNameAndPasswordArePresent(user)

  if (userNameAndPassword.isInvalid) {
    return res.status(userNameAndPassword.status).json({ message: userNameAndPassword.message });
  }

  //check to see if username or email is already taken, if not create user

  knex('users').where('email', email).orWhere('username', username).then((user) => {
    if (user.length > 0) {
       return res.status(409).json({message: "Username or email is already taken"})
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
        .select('first_name', 'last_name', 'id', 'bio', 'image', 'username', 'token')
        .then((user) => {
          res.status(201).json(user);
        })
      }).catch(err => {
          console.error(err); 
          res.sendStatus(500); 
      });
    }
  });
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
