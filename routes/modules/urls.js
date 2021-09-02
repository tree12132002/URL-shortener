const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateRandomURL = require('../../models/generateRandomURL')

router.post('/', (req, res) => {
  const inputURL = req.body.inputURL
  let hostURL = req.headers.host
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
      if (hostURL === 'localhost:3000') {
        shortURL = `http://${hostURL}/${randomURL}`
      } else {
        shortURL = `https://${hostURL}/${randomURL}`
      }
      res.render('index', { inputURL, shortURL })
    })
    .catch(error => console.error(error))
})




module.exports = router