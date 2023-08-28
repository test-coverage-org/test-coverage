'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlatformListings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Listing, {
        foreignKey: 'listing_id',
        as: 'listing',
      });
    }
  }

  PlatformListings.init(
    {
      listing_id: DataTypes.INTEGER,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PlatformListings',
      tableName: 'platform_listings',
    },
  );
  return PlatformListings;
};
