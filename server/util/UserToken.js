const jwt = require('jsonwebtoken')

module.exports.create = (user) => {
  return jwt.sign({
    _id: user._id
  }, process.env.SECRET_KEY)
}

module.exports.get = (cookies) => {
  return jwt.decode(cookies.usertoken, { complete: true })
}