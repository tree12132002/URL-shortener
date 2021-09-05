function generateRandomURL() {
  const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
  const str = `${lowerCases}${lowerCases.toUpperCase()}1234567890`

  const collection = str.split('')

  let randomURL = ''
  for (let i = 0; i <= 4; i++) {
    randomURL += sample(collection)
  }

  return randomURL
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = generateRandomURL