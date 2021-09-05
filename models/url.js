const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  inputURL: {
    type: String,
    unique: true,
    required: true
  },
  outputURL: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)