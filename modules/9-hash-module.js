const md5 = require('md5')
const args = process.argv.slice(2)

const workerIndex = parseInt(args[0])
const increment = parseInt(args[1])
const input = args[2]

let password = '',
	salt = workerIndex

while(password.length <= 8) {
  const hash = md5(input+salt)
  hash.startsWith('00000') && hash[5] < 8 ? process.send({pos: hash[5], char: hash[6]}) : ''
  salt+=increment
}

findGoodHashes(workerIndex)

process.on('message', pass => {
	password = pass
})