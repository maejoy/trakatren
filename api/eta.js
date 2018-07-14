'use strict';
var db = require('../database/models');
var humanizeDuration = require('humanize-duration');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

module.exports.handler = (event, context, callback) => {
  let id = event.pathParameters.id;

  db.Stations.findById(id).then((station) => {
    db.Trains.findAll()
      .then((trains) => {
        let response = [];

        for (let i = 0, len = trains.length; i < len; i++) {
          let distance = getDistanceFromLatLonInKm(station.latitude, station.longitude, trains[i].latitude, trains[i].longitude);
          let time = humanizeDuration((distance / trains[i].speed) * 3600000, { units: ['h', 'm'], round: true }); //convert to seconds
          response.push({
            direction: trains[i].name,
            ETA: time,
          });
        }

        callback(null, {
          statusCode: 200,
          body: response,
        });
      });
  });
};
