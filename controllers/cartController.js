const Cart = require('../models/cartModel') // Assuming a Cart model exists
const Plant = require('../models/plantModel') // Assuming a Plant model exists
const Order = require('../models/orderModel') // Assuming an Order model exists
const CartPlants = require('../models/cartPlantsModel') // Assuming an Order model exists

const addToCart = async (req, res) => {
  try {
    const { userId, plantId, quantity } = req.body
    // Check if the plant exists
    const plant = await Plant.findByPk(plantId)
    if (!plant) {
      return res.status(404).json({
        status: 'fail',
        message: 'Plant not found',
      })
    }

    // Check if the user has a cart
    let cart = await Cart.findOne({ where: { userId } })

    if (!cart) {
      // Create a cart for the user if it doesn't exist
      cart = await Cart.create({ userId })
    }

    // Check if the plant is already in the cart
    const cartPlant = await CartPlants.findOne({
      where: { cartId: cart.id, plantId },
    })

    if (cartPlant) {
      // Update quantity if the plant is already in the cart
      cartPlant.quantity += quantity
      await cartPlant.save()
    } else {
      // Add the plant to the cart
      await CartPlants.create({
        cartId: cart.id,
        plantId,
        quantity,
      })
    }

    res.status(201).json({
      status: 'success',
      message: 'Plant added to cart',
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to add plant to cart',
    })
  }
}
// Get cart details for a user
const getCart = async (req, res) => {
  try {
    // const userId = req.user.userId
    const userId = req.query.id
    const cart = await Cart.findOne({
      where: {
        userId,
      },
    })
    if (!cart) {
      return res.status(404).json({
        status: 'success',
        message: 'cart not found',
      })
    }

    const cartDetails = await CartPlants.findAll({
      where: { cartId: cart.id },
      include: [
        {
          model: Plant,
        },
      ],
    })

    if (!cartDetails || cartDetails.length === 0) {
      return res.status(200).json({
        status: 'fail',
        message: 'Cart is empty',
        cartDetails: [],
        totalPrice: 0,
      })
    }

    // Calculate total price
    const totalPrice = cartDetails.reduce((total, cartPlant) => {
      const plantPrice = cartPlant.Plant ? cartPlant.Plant.price : 0
      return total + plantPrice * cartPlant.quantity
    }, 0)

    res.status(200).json({
      status: 'success',
      cartDetails,
      totalPrice, // Send total price along with the cart details
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cart',
    })
  }
}

// Clear the cart for a user
const clearCart = async (req, res) => {
  try {
    const userId = req.query.id
    const cart = await Cart.findOne({ where: { userId } })
    await CartPlants.destroy({ where: { cartId: cart.id } })
    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
    })
  } catch (error) {
    console.error('Error clearing cart:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear cart',
    })
  }
}

// Validate the cart and create an order
const validateCart = async (req, res) => {
  try {
    const userId = req.query.id
    const cart = await Cart.findOne({ where: { userId } })
    const cartId = cart.id
    // Retrieve cart details with plant information
    const cartDetails = await CartPlants.findAll({
      where: { cartId },
      include: [
        {
          model: Plant,
        },
      ],
    })

    if (!cartDetails || cartDetails.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart is empty or not found',
      })
    }

    // Calculate the total price
    const totalPrice = cartDetails.reduce((total, cartPlant) => {
      const plantPrice = cartPlant.Plant ? cartPlant.Plant.price : 0
      return total + plantPrice * cartPlant.quantity
    }, 0)

    const newOrder = await Order.create({
      userId,
      cartId: Number(cartId),
      totalPrice,
    })

    await CartPlants.destroy({ where: { cartId } })
    res.status(201).json({
      status: 'success',
      message: 'Cart validated successfully, order created',
      order: newOrder,
    })
  } catch (error) {
    console.error('Error validating cart:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to validate cart',
    })
  }
}

module.exports = {
  addToCart,
  getCart,
  clearCart,
  validateCart,
}
