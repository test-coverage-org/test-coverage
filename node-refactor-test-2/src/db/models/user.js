'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      this.belongsTo(models.Subsidiary, {
        foreignKey: 'subsidiary_id',
        as: 'subsidiary',
      });
      this.hasMany(models.UserRoles, {
        foreignKey: 'user_id',
        as: 'user_roles',
      });
    }
  }

  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      subsidiary_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  );
  return User;
};
