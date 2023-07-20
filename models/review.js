'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Game, {
        foreignKey: 'game_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'games',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews'
    }
  )
  return Review
}
