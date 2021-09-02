const express = require('express')
const exphbs = require('express-handlebars')
const Url = require('./models/url')
const generateRandomURL = require('./models/generateRandomURL')
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

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urls', (req, res) => {
  const inputURL = req.body.inputURL
  let randomURL = ''

  return Url.find()
    .lean()
    .then(urls => {
      // 資料庫裡是否存在已處理的網站，若存在則短網址維持原儲存資料
      const alreadyPutUrl = urls.filter(url => url.inputURL === inputURL)
      if (alreadyPutUrl.length === 1) {
        randomURL = alreadyPutUrl[0].outputURL
        // 若不存在則創建新的短網址資料
      } else {
        randomURL = generateRandomURL()
        // 若創建的資料已存在於資料庫中，則重新創建短網址
        if (urls.some((randomURL) => url.outputURL === randomURL)) {
          randomURL = generateRandomURL()
        }
        const outputURL = randomURL
        return Url.create({ inputURL, outputURL })
      }
    })
    .then(() => {
      shortURL = `http://localhost:3000/${randomURL}`
      res.render('index', { inputURL, shortURL })
    })
    .catch(error => console.error(error))
})

app.get('/:randomURL', (req, res) => {
  const randomURL = req.params.randomURL
  console.log(randomURL)
  return Url.find()
    .lean()
    .then(urls => {
      const alreadyPutUrl = urls.filter(url => url.outputURL === randomURL)
      if (alreadyPutUrl[0].outputURL === randomURL) {
        res.redirect(alreadyPutUrl[0].inputURL)
      } else {
        res.redirect('/')
      }
    })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})