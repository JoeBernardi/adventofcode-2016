const md5 = require('md5')
const args = process.argv.slice(2)

const workerIndex = parseInt(args[0])
const increment = parseInt(args[1])
const input = args[2]

let password = '',
	salt = workerIndex

while(password.length <= 8) {
  const hash = md5(input+salt)
  startsWithFiveZeroes(hash) ? process.send({salt: salt, char: hash[5]}) : ''
  salt+=increment
}

function startsWithFiveZeroes(str) {
  return str.split('').slice(0,5).every((char, idx) => char === '0')
}

findGoodHashes(workerIndex)

process.on('message', pass => {
	password = pass
})