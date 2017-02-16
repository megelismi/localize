import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mergeLocationAndDescription from './handlers/location_handlers/locations_handler';
import validateUser from './handlers/user_handlers/userValidity';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
console.log(salt);

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

const localConnection = {
  database: 'localize'
}

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || localConnection
});

app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());
// app.use(passport.initialize());

const verifyPassword = (candidatePassword, salt, encryptedPassword) => {
  candidatePassword = bcrypt.hashSync(candidatePassword, salt)
  return candidatePassword === encryptedPassword; 
}

passport.use(new BasicStrategy(
  function(email, password, done) {
    knex('users').where('email', email).then((user) => {
      if (!user) { return done(null, false); }
      if (verifyPassword(password, user.salt, user.password)) { return done(null, false); }
      return done(null, user);
    })
    .catch((err) => {
      done(err)
    })
  }
));

//sign in for existing users

app.get('/signin', passport.authenticate('basic', {session: false}), (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user); 
})


//sign up new users, encrypt their passwords

app.post('/signup', (req, res) => {
  const user = req; 
  const { password } = req.body;

  const passwordToSave = bcrypt.hashSync(password, salt)
  const userValidity = validateUser(user)

  if (userValidity.isInvalid) {
    return res.status(userValidity.status).send({ message: userValidity.message });
  }

  knex.insert({
     first_name: req.body.first_name, 
     last_name: req.body.last_name,
     email: req.body.email, 
     username: req.body.username,
     password: passwordToSave, 
     salt: salt
   }).into('users')
  .then(() => {
    knex('users').where('username', req.body.username)
    .select('first_name', 'last_name', 'id', 'bio', 'image', 'username')
    .then((user) => {
      res.status(201).json(user);
    })
  }).catch(err => {
     console.error(err); 
     res.sendStatus(500); 
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

// app.get('/test/:username', (req, res) => {
//   return res.status(200).json('ok');
// }

// app.get('/test/:username', (req, res) => {
//   const { username } = req.params;
//   knex('users').where({username}).then((data) => {
//       return res.status(200).json(data);
//     })
//   }

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
