'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');


let pswrd = bcrypt.hashSync('12345', 9);

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(Review, { foreignKey: 'id' })
    }
  };
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdat: DataTypes.DATE,
    updatedat: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'users',
    createdAt: 'createdat',
    updatedAt: 'updatedat'
  });

  return users;
};