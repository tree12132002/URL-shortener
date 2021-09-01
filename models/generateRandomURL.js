function generateRandomURL() {
  const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
  const upperCases = lowerCases.toUpperCase()
  const numbers = '1234567890'

  let collection = []

  collection = collection.concat(lowerCases.split(''))
  collection = collection.concat(upperCases.split(''))
  collection = collection.concat(numbers.split(''))

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