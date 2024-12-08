const LikedPlants = require('../models/likedPlantModel')
const Plant = require('../models/plantModel')
const User = require('../models/userModel')

// Get all plants
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.findAll() // Fetch all plants from the database
    res.status(200).json({
      status: 'success',
      results: plants.length,
      plants,
    })
  } catch (error) {
    console.error('Error fetching plants:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plants',
    })
  }
}

// Add a new plant
const addPlant = async (req, res) => {
  try {
    const { name, description, image, price, stock } = req.body

    const newPlant = await Plant.create({
      name,
      description,
      image,
      price,
      stock,
      liked: false, // Default value
    })

    res.status(201).json({
      status: 'success',
      plant: newPlant,
    })
  } catch (error) {
    console.error('Error adding plant:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to add plant',
    })
  }
}

// Update the like status of a plant
const updateLike = async (req, res) => {
  try {
    const plantId = req.query.id
    const userId = req.body.userId

    const plant = await Plant.findByPk(plantId)
    const user = await User.findByPk(userId)

    if (!plant) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Plant not found' })
    }
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' })
    }

    const likedPlant = await LikedPlants.findOne({ where: { plantId, userId } })

    if (likedPlant) {
      plant.likes = Math.max(0, plant.likes - 1)
      await likedPlant.destroy()
    } else {
      plant.likes++
      await LikedPlants.create({ plantId, userId })
    }

    await plant.save()

    res.status(200).json({
      status: 'success',
      plant,
      likes: plant.likes,
      liked: !likedPlant,
    })
  } catch (error) {
    console.error('Error updating like status:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to update like status',
    })
  }
}

module.exports = {
  getPlants,
  addPlant,
  updateLike,
}
