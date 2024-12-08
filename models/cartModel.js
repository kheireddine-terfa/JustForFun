// models/Cart.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database') // Adjust path as needed
const CartPlants = require('./cartPlantsModel')
const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Matches the name of the Cart model
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
)
Cart.hasMany(CartPlants, { foreignKey: 'cartId' })
CartPlants.belongsTo(Cart, { foreignKey: 'cartId' })
module.exports = Cart
