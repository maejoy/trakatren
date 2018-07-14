'use strict';
var db = require('../database/models');

module.exports.handler = (event, context, callback) => {
  if (event.httpMethod == 'GET') {
    const params = (event.queryStringParameters === '' || event.queryStringParameters == null) ? {} : event.queryStringParameters;

    db.User.find({
      where: {
        email: params.email
      },
      attributes: ['points']
    }).then((userPoints) => {
      db.Rewards.find({
        where: {
          points: {
            lte: userPoints.points
          }
        }
      }).then((userRewards) => {
        callback(null, {
          statusCode: 200,
          body: {
            points: userPoints.points,
            rewards: userRewards,
          },
        });
      });
    });
  } else {

  }
};
