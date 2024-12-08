const User = require('../models/userModel')
const { createToken } = require('../utils/jwt')

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.create({
      username,
      email,
      password,
    })
    // Create JWT token and set it as a cookie
    const token = createToken(user.id)
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }) // expires in 1 hour

    res.status(201).json({
      status: 'success',
      user,
    })
  } catch (error) {
    console.log('error 💥', error)
    res.status(400).json({
      message: 'Error creating new user',
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isValidPassword = await user.validatePassword(password)
    console.log(isValidPassword)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    user.login = true
    await user.save({ fields: ['login'] })

    // Create JWT token and set it as a cookie
    const token = createToken(user.id)
    res.cookie('token', token, {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript
      maxAge: 3600000, // Cookie expiration (1 hour)
      sameSite: 'None',
    })
    console.log('Set-Cookie header sent:', res.getHeaders()['set-cookie'])
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      user: {
        id: user.id,
        username: user.username,
        login: user.login,
      },
    })
  } catch (error) {
    console.log('error 💥', error)
    res.status(400).json({
      message: 'Error logging in user, please try again later',
    })
  }
}
