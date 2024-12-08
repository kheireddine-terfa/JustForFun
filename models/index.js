const User = require('./userModel')
const Plant = require('./plantModel')
const Cart = require('./cartModel')
const Order = require('./orderModel')
const CartPlants = require('./cartPlantsModel')
const OrderPlants = require('./orderPlantsModel')
const LikedPlants = require('./likedPlantsModel')
const Pack = require('./packModel')

// Define associations
User.hasOne(Cart, { foreignKey: 'userId' })
Cart.belongsTo(User, { foreignKey: 'userId' })

Cart.hasMany(CartPlants, { foreignKey: 'cartId' })
CartPlants.belongsTo(Cart, { foreignKey: 'cartId' })

Plant.hasMany(CartPlants, { foreignKey: 'plantId' })
CartPlants.belongsTo(Plant, { foreignKey: 'plantId' })
Plant.belongsToMany(Pack, { through: 'PlantPack' })
Pack.belongsToMany(Plant, { through: 'PlantPack' })
Plant.belongsToMany(User, { through: 'LikedPlant' })
User.belongsToMany(Plant, { through: 'LikedPlant' })

// Export models
module.exports = {
  User,
  Plant,
  Cart,
  Order,
  CartPlants,
  Pack,
  LikedPlants,
  OrderPlants,
}
