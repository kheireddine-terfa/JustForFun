const express = require('express')
const {
  getPlants,
  addPlant,
  updateLike,
} = require('../controllers/plantController')
const router = express.Router()

router.get('/', getPlants)
router.post('/', addPlant)
router.patch('/like', updateLike)

module.exports = router
