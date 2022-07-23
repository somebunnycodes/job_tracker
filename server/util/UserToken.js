const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/jwt.config');

const create = (user) => {
  return jwt.sign({
    _id: user._id
  }, SECRET_KEY)
}

const get = (cookies) => {
  return jwt.decode(cookies.usertoken, { complete: true })
}

module.exports = {
  create, get
}