'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        allowNull: false,
        unique: true
      },
      image: {
        type: DataTypes.STRING
      },
      password_digest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: []
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
