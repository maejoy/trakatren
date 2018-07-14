'use strict';
var db = require('../database/models');
var querystring = require('querystring');

module.exports.handler = (event, context, callback) => {
  let body = (event.body !== '') ? querystring.parse(event.body) : {};

  let rewardsId = body.rewards_id;
  let rewardsPoints = body.rewards_points;
  let email = body.email;

  db.User.find({
    where: {
      email: email,
    }
  }).then((userDetails) => {
    db.User.update({
      current_points: userDetails.current_points - rewardsPoints,
    }, {
        where: {
          email: email
        },
      }).then(() => {
        db.User.find({
          where: {
            email: email,
          },
        }).then((userDetails) => {
          db.Rewards.findAll({
            where: {
              points: {
                lte: userDetails.current_points
              }
            }
          }).then((userRewards) => {
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
        });
      });
  });
};
