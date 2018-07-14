'use strict';
var db = require('../database/models');

module.exports.handler = (event, context, callback) => {
  const params = (event.queryStringParameters === '' || event.queryStringParameters == null) ? {} : event.queryStringParameters;

  if (!params.email) {
    db.Rewards.findAll()
      .then((userRewards) => {
        callback(null, {
          statusCode: 200,
          body: {
            points: 0,
            open_app_last_claimed_date: null,
            has_signed_up: false,
            rewards: userRewards,
          },
        });
        return;
      });
  } else {
    db.User.find({
      where: {
        email: params.email
      },
      attributes: ['current_points', 'last_claimed', 'has_signed_up']
    }).then((userDetails) => {
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
    });
  }
};
