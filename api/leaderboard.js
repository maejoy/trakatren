'use strict';
var db = require('../database/models');

module.exports.handler = (event, context, callback) => {
  const params = (event.queryStringParameters === '' || event.queryStringParameters == null) ? {} : event.queryStringParameters;

  db.User.findAll({
    attributes: ['email', 'total_points'],
    order: [
      ['total_points', 'desc']
    ],
    limit: 10
  }).then((users) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(users),
    });
  });
};
