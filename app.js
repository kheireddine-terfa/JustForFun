const express = require('express')
const sequelize = require('./config/database')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const plantRoutes = require('./routes/plantRoutes')
const cartRoutes = require('./routes/cartRoutes')
const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}
app.use(cors(corsOptions))

// db connection
// Sync database and models
sequelize
  .sync({ alter: false })
  .then(() => console.log('Connected to SQLite database'))
  .catch((error) =>
    console.error('Failed to connect to SQLite database:', error),
  )
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/plants', plantRoutes)
app.use('/api/cart', cartRoutes)

//------- authentication :
// listening to incomming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
