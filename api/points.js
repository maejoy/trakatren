'use strict';
var db = require('../database/models');
var querystring = require('querystring');

const GAME = {
  OPEN_APP: 10,
  SIGN_UP: 100,
  WATCH_AD: 100,
  SEND_FEEDBACK: 50,
};

module.exports.handler = (event, context, callback) => {
  let body = (event.body !== '') ? querystring.parse(event.body) : {};

  let game = body.game;
  let email = body.email;

  db.User.find({
    where: {
      email: email,
    }
  }).then((userDetails) => {
    var params = {
      total_points: userDetails.total_points + GAME[game],
      current_points: userDetails.current_points + GAME[game]
    };
    if (game == "SIGN_UP") {
      params.has_signed_up = 1;
    }
    if (game == "OPEN_APP") {
      params.last_claimed = new Date();
    }
    db.User.update(params, {
      where: {
        email: email
      },
    }).then(() => {
      db.User.find({
        where: {
          email: email,
        },
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
    });
  });
};
