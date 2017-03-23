// For example:
//
// Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.
// R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.
// R5, L5, R5, R3 leaves you 12 blocks away.
// How many blocks away is Easter Bunny HQ?

const instructions = 'L1,L3,L5,L3,R1,L4,L5,R1,R3,L5,R1,L3,L2,L3,R2,R2,L3,L3,R1,L2,R1,L3,L2,R4,R2,L5,R4,L5,R4,L2,R3,L2,R4,R1,L5,L4,R1,L2,R3,R1,R2,L4,R1,L2,R3,L2,L3,R5,L192,R4,L5,R4,L1,R4,L4,R2,L5,R45,L2,L5,R4,R5,L3,R5,R77,R2,R5,L5,R1,R4,L4,L4,R2,L4,L1,R191,R1,L1,L2,L2,L4,L3,R1,L3,R1,R5,R3,L1,L4,L2,L3,L1,L1,R5,L4,R1,L3,R1,L2,R1,R4,R5,L4,L2,R4,R5,L1,L2,R3,L4,R2,R2,R3,L2,L3,L5,R3,R1,L4,L3,R4,R2,R2,R2,R1,L4,R4,R1,R2,R1,L2,L2,R4,L1,L2,R3,L3,L5,L4,R4,L3,L1,L5,L3,L5,R5,L5,L4,L2,R1,L2,L4,L2,L4,L1,R4,R4,R5,R1,L4,R2,L4,L2,L4,R2,L4,L1,L2,R1,R4,R3,R2,R2,R5,L1,L2'.split(',')

let currentCoords = [0, 0]
let invert = false

instructions.forEach((instruction, index) => {
  let isOdd = index%2 === 1

  let direction = instruction[0]
  let augment = parseInt(instruction.slice(1))

  augment = invert === (direction === "L" === isOdd) ? augment*=-1 : augment
  invert = direction === "R" === isOdd ? !invert : invert

  currentCoords[index%2] += augment
})

console.log(currentCoords.reduce((acc, coord) => acc + Math.abs(coord), 0))
