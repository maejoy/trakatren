'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.sequelize.transaction((t) =>
    Promise.all([
      queryInterface.addColumn('users', 'email', {
        type: DataTypes.STRING,
        allowNull: false,
      },
        {
          transaction: t,
        }),
      queryInterface.addColumn('users', 'password', {
        type: DataTypes.STRING,
        allowNull: false,
      },
        {
          transaction: t,
        }),
      queryInterface.changeColumn('users', 'points', {
        defaultValue: 0,
      },
        {
          transaction: t,
        })
    ])
  ),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) =>
    Promise.all([
      queryInterface.removeColumn('users', 'email',
        {
          transaction: t,
        }),
      queryInterface.removeColumn('users', 'password',
        {
          transaction: t,
        }),
    ])
  ),
};
