  import 'babel-polyfill';
  import express from 'express';
  import bodyParser from 'body-parser';

  const HOST = process.env.HOST;
  const PORT = process.env.PORT || 8080;

  console.log(`Server running in ${process.env.NODE_ENV} mode`);

  const app = express();

  const knex = require('knex')({
    client: 'pg',
      connection: 'postgres://kxtoxtxg:fHkkP3KmbQHqeKYSq1wnMAETHsDBWjCN@babar.elephantsql.com:5432/kxtoxtxg'
  })

  app.use(express.static(process.env.CLIENT_PATH));
  app.use(bodyParser.json());


  app.get('/locations', (req, res) => {
    knex('locations').then((locations) => {
      return res.status(200).json(locations);
    });
  })

  //get all tags

  app.get('/tags', (req, res) => {
    knex('tags').then((tags) => {
      return res.status(200).json(tags);
    })
  })

  // get all data from location_tags

  app.get('/locations/tags', (req,res) => {
    knex('locations_users_tags').then((locations_users_tags) => {
        return res.status(200).json(locations_users_tags);
    })
  })

  //get all reviews

  app.get('/reviews', (req,res) => {
    knex('reviews').then((reviews) => {
      return res.status(200).json(reviews);
    })
  })

  //get all locations with that tag

  app.get('/locations/:tag', (req, res) => {
    const { tag } = req.params;
    knex('tags').where({tag}).select('user_id')
    .then((data) => {
      knex('locations').whereIn('user_id', data[0].user_id)
      .then((locations) => {
          return res.status(200).json(locations);
      })
    })
  })

  //get all users with that tag

  app.get('/users/:tag', (req, res) => {
    const { tag } = req.params;
    knex('tags').where({tag}).select('user_id')
    .then((data) => {
      knex('users').whereIn('id', data[0].user_id)
      .then((users) => {
        console.log(users)
         return res.status(200).json(users);
      })
    })
  })

  //get all users

  app.get('/users', (req, res) => {
    knex('users').then((users) => {
      return res.status(200).json(users);
    })
  })

  //get all location id/user ids/ tag ids

  app.get('/locations/users/tags', (req, res) => {
    knex('locations_users_tags').then((data) => {
      return res.status(200).json(data);
    })
  })


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
