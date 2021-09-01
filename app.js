const express = require('express')
const exphbs = require('express-handlebars')
const URL = require('./models/url')
const generateRandomURL = require('./models/generateRandomURL')
const bodyParser = require('body-parser')
const app = express()

// mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shortened', (req, res) => {
  const inputURL = req.body.inputURL
  console.log(inputURL)
})

app.listen(3001, () => {
  console.log('App is running on http://localhost:3000')
})