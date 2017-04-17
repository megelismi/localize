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
import * as locationHandlers from './handlers/location_handlers/location_handlers'; 
import verifyPassword from './handlers/user_handlers/verify_password';
import createLocationIdsArrayForUser from './handlers/user_handlers/user_locations'; 
import selectQuery from './handlers/query_handlers/select_query'; 


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

passport.use(new Strategy(
  (token, callback) => knex('users').where('token', token)
  .then((user) => {
    if (!user) { return callback(null, false); }
    return callback(null, user);
    })
  .catch((err) => {
    console.log(err);
    return callback(err);
  })
));

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
  const review = req.body;
  const locationName = review.locationInfo.name;
  const lat_long = locationHandlers.convertLatLongToArray(review.locationInfo.lat_long);
  let savedLocationId;
  let savedReviewId;
  knex('locations').where('name', locationName)
    .andWhere('lat_long', lat_long)
    .then(location => {
      if (!location[0]) {
        return knex('locations').insert({ name: locationName, lat_long })
        .returning('id')
        .then(id => {
          console.log('New location saved with id ', id);
          savedLocationId = id[0];
          return savedLocationId; 
        })
        .catch(err => {
          console.log('Error saving new location:', err);
          return res.sendStatus(400);
        });
      } 
      savedLocationId = location[0].id;
      return savedLocationId; 
    })
    .then(() => {
      knex('reviews').where('location_id', savedLocationId)
      .andWhere('user_id', review.user_id)
      .then(reviewRes => {
        if (!reviewRes[0]) {
          return knex('reviews').insert({
            user_id: review.user_id,
            location_id: savedLocationId,
            short_description: review.short_description,
            long_description: review.long_description,
            saved: true
          })
          .returning('id')
          .then(id => {
            console.log('Review saved.');
            savedReviewId = id[0]; 
            return savedReviewId;
          })
          .catch(err => {
            console.error('Error saving review:', err);
            return res.sendStatus(400);
          });
        } 
        return knex('reviews').where('location_id', savedLocationId)
          .andWhere('user_id', review.user_id)
          .update({
            short_description: review.short_description,
            long_description: review.long_description,
            saved: true
          })
          .returning('id')
          .then(id => {
            console.log('Review updated!');
            savedReviewId = id[0];
            return savedReviewId; 
          });
        })
        .then(() => {
          if (review.locationInfo.tags) {
            review.locationInfo.tags.forEach(user_tag => knex('tags')
              .where('tag', user_tag)
              .then(result => {
                if (!result[0]) {
                  return knex('tags').insert({
                    tag: user_tag
                  })
                  .returning('id')
                  .then(id => { 
                    return knex('locations_users_tags').insert({
                      location_id: savedLocationId,
                      tag_id: id[0],
                      user_id: review.user_id,
                      review_id: savedReviewId
                    });
                  })
                  .then(() => console.log('Relation saved1.'))
                  .catch(error => console.error('Error saving relation1: ', error));
                } 
                return knex('locations_users_tags').insert({
                  location_id: savedLocationId,
                  tag_id: result[0].id,
                  user_id: review.user_id,
                  review_id: savedReviewId
                })
                .then(() => console.log('Relation saved2.'))
                .catch(error => console.error('Error saving relation2: ', error));
            }));
          } else {
            return;
          }
        });
      });
    return res.sendStatus(201);
});

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

//get all locations that have been reviewed in that city

app.get('/locations/city/:city_id/', (req, res) => {
  const cityId = req.params.city_id; 
  knex.select('location_id').from('reviews').then((locations) => {
    const locationIds = _.uniq(locations.map(location => {
      return location.location_id; 
    })); 
    let selectLocationsByLocationIdsQuery = selectQuery(locationIds, '*', 'locations', 'id');
    selectLocationsByLocationIdsQuery += `and city_id = ${cityId}`; 
    knex.raw(selectLocationsByLocationIdsQuery).then((data) => res.status(200).json(data.rows));
  }); 
});

//get all locations and reviews for a single user

app.get('/locations/reviews/city/:city_id/:user_id', (req, res) => {
  const userId = req.params.user_id; 
  knex('reviews').where('user_id', userId).then(reviews => { 
    if (reviews.length === 0) {
      return res.status(200).json(reviews); 
    }
    const locationIds = reviews.map(review => {
      return review.location_id; 
    });
  let selectTagIdsByLocationIdsQuery 
  = selectQuery(locationIds, '*', 'locations_users_tags', 'location_id'); 
    selectTagIdsByLocationIdsQuery += ` and user_id = ${userId}`;
    knex.raw(selectTagIdsByLocationIdsQuery).then((data) => {
      const locationTagIds = data.rows;
      const tagIds = locationTagIds.map(ids => ids.tag_id);
      const selectTagsByTagIdQuery = selectQuery(tagIds, '*', 'tags', 'id');
      knex.raw(selectTagsByTagIdQuery).then((data) => {
        const tags = data.rows;
        let tagValues = tagHandlers.addTagValues(locationTagIds, tags); 
        tagValues = tagHandlers.removeDuplicatedTags(tagValues);  
        const selectLocationsByLocationIdsQuery = selectQuery(locationIds, '*', 'locations', 'id'); 
        knex.raw(selectLocationsByLocationIdsQuery).then(data => {
          const locations = data.rows; 
          const locationsWithTags = locationHandlers.mergeLocationsAndTags(locations, tagValues);
          const mergedLocationsAndReviews = locationHandlers.mergeLocationsAndReviews(reviews, locationsWithTags); 
          return res.status(200).json(mergedLocationsAndReviews);
        });
      });
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

app.delete('/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  const deleteQuery = `delete from reviews where id = ${reviewId}`;
  knex.raw(deleteQuery).then(() => { 
    return res.sendStatus(202); 
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
