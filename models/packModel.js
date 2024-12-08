const { DataTypes } = require('sequelize')
const sequelize = require('../config/database') // Adjust path as needed

const PlantPack = sequelize.define(
  'PlantPack',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = PlantPack
