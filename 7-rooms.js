// The room names are encrypted by a state-of-the-art shift cipher, which is nearly unbreakable without the right software. However, the information kiosk designers at Easter Bunny HQ were not expecting to deal with a master cryptographer like yourself.

// To decrypt a room name, rotate each letter forward through the alphabet a number of times equal to the room's sector ID. A becomes B, B becomes C, Z becomes A, and so on. Dashes become spaces.

// For example, the real name for qzmt-zixmtkozy-ivhz-343 is very encrypted name.

// What is the sector ID of the room where North Pole objects are stored?



const fs = require('fs')
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')


let roomCodes = fs.readFileSync('inputs/6-rooms-input.txt', 'utf8').trim()
  .split('\n')
  .map(line => line.slice(0,-1)
  .split('['))

const decoded = roomCodes.filter(roomCodeAndChecksum => {

  let roomCode = roomCodeAndChecksum[0],
      checksum = roomCodeAndChecksum[1],
      code = roomCode.slice(0, roomCode.length-3).replace(/-/g, '').split('')

  let obj = {}

  code.map(letter => {
    letter in obj ? obj[letter]['count']++ : obj[letter] = {'letter':letter, 'count':1}
  })

  return isValid(obj, checksum)

})
.map(valid => {
  let roomCode = valid[0],
      code = roomCode.replace(/-/g,' ').slice(0, roomCode.length-4).split('')
      sectorId = parseInt(roomCode.slice(roomCode.length-3, roomCode.length))
      return [code.map(letter => shiftLetter(letter, sectorId)).join(''), sectorId]
})

fs.writeFile('6-rooms-decoded.txt', decoded, (err) => {
  if(err) console.log(err)
})

function shiftLetter(letter, sectorId){
  const letterPos = letters.indexOf(letter)
  if(letterPos === -1 ) {
    return ' '
  }
  let shift = letterPos + sectorId%26 // 27 
  shift = shift > letters.length-1 ? shift - letters.length : shift
  return letters[shift]
}



function compareFrequencies(a, b) {
  if(a.count === b.count) {
    return a.letter < b.letter ? -1 : a.letter > b.letter ? 1 : 0
  } else {
    return b.count - a.count
  }
}

function isValid(obj, checksum) {
  return Object.keys(obj)
  .map((key,idx,array) => obj[key])
  .sort(compareFrequencies)
  .slice(0,5)
  .map((obj) => obj.letter)
  .join('') === checksum 
}