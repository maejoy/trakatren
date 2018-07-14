'use strict';
module.exports = function (sequelize, DataTypes) {
  var Stations = sequelize.define('Stations', {
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
  }, {
      timestamps: false,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Stations;
};