const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  // console.log(req.headers)
  const token = req.headers.token
  const secretKey = process.env.JWT_SECRET_KEY
  const verification = jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return res.json({
        msg: "Token Error",
        data: null,
        err: err
      })
    }
    req.user = data
    next()
  })
}

module.exports = {
  verifyToken
}