const { DataTypes } = require('sequelize')
const sequelize = require('../config/database') // Adjust path as needed

const Order = sequelize.define(
  'Order',
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
        model: 'Users', // Assuming you have a Users model
        key: 'id',
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts', // References the Cart model
        key: 'id',
      },
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    timestamps: true, // Optional: Tracks when the order was created/updated
  },
)

module.exports = Order
