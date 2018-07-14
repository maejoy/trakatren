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
    callback(null, {
      statusCode: 200,
      body: {
        points: 0,
        open_app_last_claimed_date: null,
        has_signed_up: false,
        rewards: null,
      },
    });
  }).catch(() => {
    callback(null, {
      statusCode: 500,
      body: 'Account already exists.',
    });
  });
};
