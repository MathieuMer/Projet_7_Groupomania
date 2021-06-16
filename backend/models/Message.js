'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      Message.hasMany(models.Comment, { onDelete: 'cascade', hooks: true });
    }
  };
  Message.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT + ' CHARSET utf8mb4 COLLATE utf8_general_ci',
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING
    },
    isSignaled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Message'
  });
  return Message;
};