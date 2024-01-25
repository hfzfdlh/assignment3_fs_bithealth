'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    name: {
      type:DataTypes.STRING
    },
    username: {
      type:DataTypes.STRING,
    },
    email: {
      type:DataTypes.STRING,
      unique:{
        msg:"email must be unique"
      },
      validate:{
        notNull:{
          msg:"Email is null"
        },
        isEmail:{
          msg:'invalid email / password'
        }
      },
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Email is null"
        }
      }
    },
    phoneNumber: {
      type:DataTypes.STRING,
    },
    address: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};