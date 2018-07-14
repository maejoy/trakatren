'use strict';
var db = require('../database/models');
var querystring = require('querystring');

module.exports.handler = (event, context, callback) => {
  let body = (event.body !== '') ? querystring.parse(event.body) : {};

  let direction = event.pathParameters.direction;
  let speed = body.speed;
  let latitude = body.latitude;
  let longitude = body.longitude;

  db.Trains.update({
    latitude,
    longitude,
    speed,
  }, {
      where: {
        name: direction,
      },
    }
  ).then(() => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify('Successfully updated train location'),
    });
  });
};
