const jwt = require('jsonwebtoken')

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log(req.cookies)
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to access.',
      })
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Attach user data to the request
    next()
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token',
    })
  }
}
