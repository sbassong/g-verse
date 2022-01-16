'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.hasMany(models.Review, {
        foreignKey: 'game_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Game.belongsToMany(models.Cart, {
        through: models.Cart_game,
        as: 'cart_items',
        foreignKey: 'game_id'
      })
    }
  }
  Game.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      released: {
        type: DataTypes.STRING,
        allowNull: false
      },
      platform: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Game',
      tableName: 'games'
    }
  )
  return Game
}
