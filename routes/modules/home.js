const express = require('express')
const router = express.Router()
const Url = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:randomURL', (req, res) => {
  const randomURL = req.params.randomURL
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

module.exports = router