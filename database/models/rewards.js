'use strict';
module.exports = function (sequelize, DataTypes) {
  var Rewards = sequelize.define('Rewards', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    points: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    validity_date: DataTypes.STRING,
  }, {
      timestamps: false,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Rewards;
};