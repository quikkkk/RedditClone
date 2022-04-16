const jwt = require('jsonwebtoken')
const { key } = require('./config/config')

module.exports = function (req, res, next) {
 const AUTH_HEADER = req.headers['authorization']
 const token = AUTH_HEADER && AUTH_HEADER.split(' ')[1]

 if (token === null)
  return res.json({ message: 'Token is empty', status: false })

 jwt.verify(token, key, (err, user) => {
  if (err)
   return res.json({ message: `Error: ${err}`, status: false })

  req.user = user
  next()
 })
}