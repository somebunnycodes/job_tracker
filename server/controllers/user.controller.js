const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserToken = require('../util/UserToken');
const { SECRET_KEY } = require('../config/jwt.config');

// registration
const register = async (req, res) => {
  // console.log(req.body)
  try {
    users = await User.find({email: req.body.email})
    if (users.length!==0) return res.status(400).json( {errors: {email: {message: 'Email already taken'}}})
    user = await User.create(req.body)
    const userToken = UserToken.create(user)

    res.cookie("usertoken", userToken, SECRET_KEY, {
      httpOnly: true
    })
      .json({ msg: "success!", user: user });
  } catch (err) {
    res.status(400).json(err);
  }
}

// login
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    // email not found in users collection
    return res.sendStatus(400);
  }

  // if we made it this far, we found a user with this email address
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(req.body.password, user.password);

  if (!correctPassword) {
    // password wasn't a match!
    return res.sendStatus(400);
  }

  // if we made it this far, the password was correct
  const userToken = UserToken.create(user)

  // note that the response object allows chained calls to cookie and json
  res.cookie("usertoken", userToken, SECRET_KEY, {
    httpOnly: true
  })
    .json({ msg: "success!" });
}

// get logged in user
const getLoggedInUser = (req, res) => {
  // const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
  const userToken = UserToken.get(req.cookies);
  User.findById(userToken.payload._id)
    .then(user => {
      // use toObject method to be able to delete a key-value pair
      user = user.toObject()
      delete user.password
      res.json(user)
    })
    .catch(err => res.json(err))
}

// logout
const logout = (req, res) => {
  res.clearCookie('usertoken');
  res.sendStatus(200);
}

// get all users
const getAll = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
}

module.exports = {
  getAll,
  getLoggedInUser,
  login,
  logout,
  register
};