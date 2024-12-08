const express = require('express')
const {
  addToCart,
  getCart,
  clearCart,
  validateCart,
} = require('../controllers/cartController')
const router = express.Router()
// const { protect } = require('../middlewares/protect')
router.post('/', addToCart)
router.get('/', getCart)
router.delete('/', clearCart)
router.post('/validate', validateCart)

module.exports = router
