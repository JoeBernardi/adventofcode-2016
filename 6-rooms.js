// A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

// aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
// a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
// not-a-real-room-404[oarel] is a real room.
// totally-real-room-200[decoy] is not.

// What is the sum of the sector IDs of the real rooms?

const fs = require('fs')

let roomCodes = fs.readFileSync('6-rooms-input.txt', 'utf8').trim()
  .split('\n')
  .map(line => line.slice(0,-1)
  .replace(/-/g, '')
  .split('['))

const sum = roomCodes.reduce((acc, roomCodeAndChecksum) => {

  let roomCode = roomCodeAndChecksum[0]
      checksum = roomCodeAndChecksum[1]
      code = roomCode.slice(0, roomCode.length-3).split('')
      sectorId = parseInt(roomCode.slice(roomCode.length-3, roomCode.length))

  let obj = {}

  code.map(letter => {
    letter in obj ? obj[letter]['count']++ : obj[letter] = {'letter':letter, 'count':1}
  })

  return isValid(obj, checksum) ? acc + sectorId : acc

}, 0)


console.log(sum)


function compareFrequencies(a, b) {
  if(a.count === b.count) {
    return a.letter < b.letter ? -1 : a.letter > b.letter ? 1 : 0
  } else {
    return b.count - a.count
  }
}

function isValid(obj, checksum) {
  return Object.keys(obj)
  .map(key => obj[key])
  .sort(compareFrequencies)
  .slice(0,5)
  .map((obj) => obj.letter)
  .join('') === checksum 
}