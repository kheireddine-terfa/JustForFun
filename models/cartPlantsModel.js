const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Plant = require('./plantModel')

const CartPlants = sequelize.define(
  'CartPlants',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts', // Matches the name of the Cart model
        key: 'id',
      },
    },
    plantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Plants', // Matches the name of the Plant model
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.VIRTUAL, // Virtual field for calculated price
      get() {
        // Access the price from the related Plant model and multiply it by the quantity
        const plantPrice = this.getDataValue('Plant')?.price || 0 // Default to 0 if no plant is found
        return plantPrice * this.quantity
      },
    },
  },
  {
    timestamps: true, // Optional: Tracks when the relationship was created/updated
  },
)

// Define the relationship between CartPlants and Plant
CartPlants.belongsTo(Plant, { foreignKey: 'plantId' })
Plant.hasMany(CartPlants, { foreignKey: 'plantId' })

// Hook to update the price whenever the quantity is updated
CartPlants.beforeUpdate(async (cartPlant, options) => {
  const plant = await Plant.findByPk(cartPlant.plantId)
  if (plant) {
    cartPlant.price = plant.price * cartPlant.quantity // Recalculate price based on updated quantity
  }
})

module.exports = CartPlants
