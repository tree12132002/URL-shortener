const express = require('express')
const exphbs = require('express-handlebars')
const Url = require('./models/url')
const generateRandomURL = require('./models/generateRandomURL')
const routes = require('./routes')
const app = express()

// mongoose
const mongoose = require('mongoose')
const url = require('./models/url')
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

app.use(express.urlencoded({ extended: true }))
app.use(routes)

// routes setting





app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})