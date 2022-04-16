const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { key } = require('../MiddleWare/config/config')

const GET_USER_FROM_TOKEN = token => {
 const USER_INFO = jwt.verify(token, key)
 return User.findById(USER_INFO.id)
}

class Controller {

 async Registration (req, res) {
  try {
   const { email, username } = req.body
   const password = bcrypt.hashSync(req.body.password, 8)
   const user = new User({ email, username, password })

   user.save().then(user => {
    jwt.sign({ id: user._id }, key, (err, token) => {
     if (err)
      return res.json({ message: { err }, status: false })

     res.json({ message: `Token: ${token}`, status: true })
    })
   })
  } catch (e) {
   throw e;
  }
 }

 async Login (req, res) {
  try {
   const { username, password } = req.body

   User.findOne({ username }).then(user => {
    if (user && user.username) {
     const check_password = bcrypt.compareSync(password, user.password)

     if (check_password)
      return jwt.sign({ id: user._id }, key, (err, token) => res.json({ message: `Token: ${token}`, status: true }).cookie('token', token).send())

     return res.json({ message: 'Invalid username or password', status: false })
    }
   })
  } catch (e) {
   throw e;
  }
 }

 async User (req, res) {
  try {
   const token = req.cookies.token

   GET_USER_FROM_TOKEN(token).then(user => res.json({ username: user.username }))
  } catch (e) {
   throw e;
  }
 }

 async Logout (req, res) {
  try {
   res.cookie('token', '').send()
  } catch (e) {
   throw e;
  }
 }
}

module.exports = new Controller()