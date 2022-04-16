const { Schema, model } = require('mongoose')

const User = new Schema({
 email: {
  type: String,
  required: true,
  unique: true
 },
 username: {
  type: String,
  required: true,
  unique: true
 },
 password: {
  type: String,
  required: true
 }
}, { timestamps: true })

module.exports = model('User', User)