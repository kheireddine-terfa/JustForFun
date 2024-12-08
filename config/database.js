// ./config/database.js
const { Sequelize } = require('sequelize')
const path = require('path')

const databasePath = path.join(__dirname, '../database/plants_database.sqlite')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath, // Path to the SQLite file
  logging: false,
})

module.exports = sequelize
