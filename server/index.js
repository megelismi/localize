import 'babel-polyfill';
import 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import bcrypt from 'bcryptjs';
import _ from 'underscore'; 
import * as userValidity from './handlers/user_handlers/sign_up_validity';
import * as tagHandlers from './handlers/tag_handlers/tag_handlers';
import verifyPassword from './handlers/user_handlers/verify_password';
import createLocationIdsArrayForUser from './handlers/user_handlers/user_locations'; 
import selectQuery from './handlers/query_handlers/select_query'; 
import mergeLocationsAndReviews from './handlers/location_handlers/location_handlers'; 

const salt = bcrypt.genSaltSync(10);
const uuidV1 = require('uuid/v1');

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
app.use(passport.initialize());

const localConnection = {
  database: 'localize'
};

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || localConnection
});

app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());

//keep users logged in

app.get('/find/cookie/:token', (req, res) => {
  const { token } = req.params;
  knex('users')
    .where('token', token)
    .then(user => {
      if (!user[0]) {
        res.status(404).json({ message: 'User not found' });
      } else {
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
      }
    });
});

// save new map

app.post('/map', (req, res) => {
  const content = req.body;
  const { name, lat_long } = content;
  let saved_location_id;

  knex('locations')
    .where('name', content.name)
    .andWhere('lat_long', [content.lat_long.lat 
      || content.lat_long[0], content.lat_long.lng 
      || content.lat_long[1]])
    .then(location => {
      if (!location[0]) {
        return knex('locations').insert({
          name,
          address: null,
          lat_long: [lat_long.lat, lat_long.lng]
        })
        .returning('id')
        .then(id => {
          console.log('New location saved with id ', id);
          saved_location_id = id[0];
          return saved_location_id; 
        })
        .catch(err => {
          res.sendStatus(400);
          console.log('Error saving new location:', err);
        });
      } 
        saved_location_id = location[0].id;
        return saved_location_id; 
      })
    .then(() => {
      knex('reviews')
      .where('location_id', saved_location_id)
      .andWhere('user_id', content.user_id)
      .then(review => {
        if (!review[0]) {
          return knex('reviews').insert({
            user_id: content.user_id,
            location_id: saved_location_id,
            short_description: content.short_description,
            long_description: content.long_description,
            image: content.image,
            show: content.show,
            saved: true
          })
          .then(() => console.log('Review saved.'))
          .catch(err => {
            res.sendStatus(400);
            console.error('Error saving review:', err);
          });
        } 
          knex('reviews')
          .where('location_id', saved_location_id)
          .andWhere('user_id', content.user_id)
          .update({
            short_description: content.short_description,
            long_description: content.long_description,
            show: content.show,
            saved: true
          })
          .then(() => console.log('Review updated!'));
      });
    })
    .then(() => {
      if (content.tag_array) {
        content.tag_array.forEach(user_tag => knex('tags')
          .where('tag', user_tag)
          .then(result => {
            if (!result[0]) {
              return knex('tags').insert({
                tag: user_tag
              })
              .returning('id')
              .then(id => knex('locations_users_tags').insert({
                  location_id: saved_location_id,
                  tag_id: id[0],
                  user_id: content.user_id
                })
                .then(() => console.log('Relation saved.'))
                .catch(error => console.error('Error saving relation: ', error)));
            } 
              return knex('locations_users_tags').insert({
                location_id: saved_location_id,
                tag_id: result[0].id,
                user_id: content.user_id
              })
              .then(() => console.log('Relation saved.'))
              .catch(error => console.error('Error saving relation: ', error));
          }));
      } else {
        return;
      }
    });
  return res.sendStatus(201);
});

passport.use(new Strategy(
  (token, callback) => knex('users').where('token', token).then((user) => {
      if (!user) { return callback(null, false); }
      return callback(null, user);
    }).catch((err) => {
      console.log(err);
      return callback(err);
    })
));

//sign in existing users

app.post('/signin', (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!userValidity.allFormFieldsFilledIn(req.body)) {
    return res.status(422).json({ message: 'All fields are required.' });
  } 
    knex('users').where('email', emailOrUsername)
    .orWhere('username', emailOrUsername)
    .then((user) => {
      if (!user[0]) {
        return res.status(401).json({ message: 'The email or username you entered is incorrect.' });
      }
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
      }
      return res.status(401).json({ message: 'The password you entered is incorrect.' });
    });
});
//sign up new users, encrypt their passwords

app.post('/signup', (req, res) => {
  const user = req;
  const { password, email, username } = req.body;
  const passwordToSave = bcrypt.hashSync(password, salt);
  const token = uuidV1();
  const userValidityCheck = userValidity.signUpValidity(user);

  if (userValidityCheck.isInvalid) {
    return res.status(userValidityCheck.status).json({ message: userValidityCheck.message });
  }

  //check to see if username or email is already taken, if not create user

  knex('users').where('email', email).then((user) => {
    if (user.length > 0) {
       return res.status(409)
       .json({ message: 'That email address is already on file. Try signing in.' });
    }
  });

  knex('users').where('username', username).then((user) => {
    if (user.length > 0) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
    knex.insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: passwordToSave,
      salt,
      token
    }).into('users')
    .then(() => knex('users').where('username', req.body.username)
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
      })).catch(err => {
        console.error(err);
        return res.sendStatus(500);
    });
  });
});

//sign out a user

app.post('/logout', passport.authenticate('bearer', { session: false }), (req, res) => {
  return res.sendStatus(200);
}); 

//update user account info

app.put('/account/:userId/update', passport.authenticate('bearer', { session: false }), 
  (req, res) => {
  const { userId } = req.params;
  knex('users').where('id', userId)
  .update(req.body)
  .into('users')
  .then(() => knex('users').where('id', userId)
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
    }))
  .catch(err => {
    console.error(err);
    return res.status(500).json({ err });
  });
});

//get all locations that have been reviewed in that city or by a certain user

app.get('/locations/city/:city_id/', (req, res) => {
  const cityId = req.params.city_id; 
  knex('locations').where('city_id', cityId).then((locations) => res.status(200).json(locations));
});

//get all locations and reviews for a single user

app.get('/locations/reviews/city/:city_id/:user_id', (req, res) => {
  const userId = req.params.user_id; 
  knex('reviews').where('user_id', userId).then(reviews => {
    const locationIds = reviews.map(review => {
      return review.location_id; 
    }); 
    const selectLocationsByLocationIdsQuery = selectQuery(locationIds, '*', 'locations', 'id'); 
    knex.raw(selectLocationsByLocationIdsQuery).then(data => {
      const locations = data.rows; 
      const mergedLocationsAndReviews = mergeLocationsAndReviews(reviews, locations); 
      res.status(200).json(mergedLocationsAndReviews);
    });
  }); 
}); 

// get all users who have reviewed locations in that city

app.get('/users/city/:city_id', (req, res) => {
  const { city_id } = req.params; 
  knex('locations').where('city_id', city_id).then((locations) => {
    const locationsIds = locations.map((location) => location.id); 
    const selectUserIdsByLocationIdsQuery = 
    selectQuery(locationsIds, 'user_id, location_id', 'locations_users_tags', 'location_id');
    knex.raw(selectUserIdsByLocationIdsQuery).then((data) => {
      const usersAndLocationIds = data.rows; 
      const userIds = data.rows.map((data) => data.user_id); 
      const selectUsersByUserIdsQuery = 
      selectQuery(userIds, 'bio, first_name, id, image', 'users', 'id'); 
      knex.raw(selectUsersByUserIdsQuery).then((data) => {
        const users = data.rows; 
        users.forEach((user) => {
          const locations = createLocationIdsArrayForUser(user.id, usersAndLocationIds); 
          user.locations = locations; 
        }); 
        return res.status(200).json(users);
      });
    });
  });
}); 

//get all reviews for a location or all reviews for a single user

app.post('/reviews', (req, res) => { 
  const { locationId, userId } = req.body; 
  if (userId !== 0) {
    knex('reviews').where({ location_id: locationId, user_id: userId }).then((reviews) => {
      knex('locations').where({ id: locationId }).select('name').then((name) => {
        const locationName = name[0].name; 
        return res.status(200).json({ locationName, reviews }); 
      });
    });
  } else {
    knex('reviews').where('location_id', locationId).then((reviews) => {
      knex('locations').where({ id: locationId }).select('name').then((name) => {
        const locationName = name[0].name; 
        return res.status(200).json({ locationName, reviews }); 
      });
    });
  } 
}); 

//get all tags for locations associated with a city or all tags associated with locations and a user

app.post('/tags', (req, res) => {
  const { locationIds, userId } = req.body;
  let selectTagIdsByLocationIdsQuery 
  = selectQuery(locationIds, 'tag_id', 'locations_users_tags', 'location_id'); 
  if (userId !== 0) {
    selectTagIdsByLocationIdsQuery += ` and user_id = ${userId}`;
  }
  knex.raw(selectTagIdsByLocationIdsQuery).then((data) => {
    const locationTagIds = data.rows;
    const tagIds = locationTagIds.map(ids => ids.tag_id);
    const selectTagsByTagIdQuery = selectQuery(tagIds, '*', 'tags', 'id');
    knex.raw(selectTagsByTagIdQuery).then((data) => {
      const tags = data.rows;
      let tagsResponse = tagHandlers.addTagValues(locationTagIds, tags); 
      tagsResponse = tagHandlers.removeDuplicatedTags(tagsResponse);  
      return res.status(200).json(tagsResponse);
    }); 
  });
});

//get locations for that tag, userId optional

app.post('/locations/tags', (req, res) => {
  const { tags, userId } = req.body; 
  let selectLocationsByTagsAndUserQuery 
  = selectQuery(tags, 'location_id', 'locations_users_tags', 'tag_id');  
  if (userId !== 0) {
    selectLocationsByTagsAndUserQuery += ` and user_id = ${userId}`;
  }
  knex.raw(selectLocationsByTagsAndUserQuery).then((data) => {
    let locationIds = data.rows.map(location => location.location_id); 
    locationIds = _.uniq(locationIds); 
    const selectLocationsFromLocationIdsQuery = selectQuery(locationIds, '*', 'locations', 'id'); 
    knex.raw(selectLocationsFromLocationIdsQuery).then((data) => {
      const locations = data.rows; 
      return res.status(200).json(locations); 
     }); 
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
