const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY || "some random secret key for development purposes";

// authenticate will authentic users in the server by looking at cookies
const authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  })
}

module.exports = {
  authenticate, SECRET_KEY
}