'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
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

  Step.init(
    {
      listing_id: DataTypes.INTEGER,
      flowId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      step: DataTypes.JSON,
      listingFlow: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Step',
      tableName: 'steps',
    },
  );
  return Step;
};
