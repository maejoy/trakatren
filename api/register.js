'use strict';
var db = require('../database/models');
var querystring = require('querystring');

module.exports.handler = (event, context, callback) => {
  let body = (event.body !== '') ? querystring.parse(event.body) : {};
  const points = 100;

  db.User.create({
    email: body.email,
    password: body.password,
  }).then(() => {
    db.Rewards.findAll()
      .then((userRewards) => {
        callback(null, {
          statusCode: 200,
          body: {
            points: userDetails.current_points,
            open_app_last_claimed_date: userDetails.last_claimed,
            has_signed_up: userDetails.has_signed_up,
            rewards: userRewards,
          },
        });
      });
  }).catch(() => {
    callback(null, {
      statusCode: 500,
      body: 'Account already exists.',
    });
  });
};
