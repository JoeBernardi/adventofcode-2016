// Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice.
//
// For example, if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.
//
// How many blocks away is the first location you visit twice?

const instructions = 'L1,L3,L5,L3,R1,L4,L5,R1,R3,L5,R1,L3,L2,L3,R2,R2,L3,L3,R1,L2,R1,L3,L2,R4,R2,L5,R4,L5,R4,L2,R3,L2,R4,R1,L5,L4,R1,L2,R3,R1,R2,L4,R1,L2,R3,L2,L3,R5,L192,R4,L5,R4,L1,R4,L4,R2,L5,R45,L2,L5,R4,R5,L3,R5,R77,R2,R5,L5,R1,R4,L4,L4,R2,L4,L1,R191,R1,L1,L2,L2,L4,L3,R1,L3,R1,R5,R3,L1,L4,L2,L3,L1,L1,R5,L4,R1,L3,R1,L2,R1,R4,R5,L4,L2,R4,R5,L1,L2,R3,L4,R2,R2,R3,L2,L3,L5,R3,R1,L4,L3,R4,R2,R2,R2,R1,L4,R4,R1,R2,R1,L2,L2,R4,L1,L2,R3,L3,L5,L4,R4,L3,L1,L5,L3,L5,R5,L5,L4,L2,R1,L2,L4,L2,L4,L1,R4,R4,R5,R1,L4,R2,L4,L2,L4,R2,L4,L1,L2,R1,R4,R3,R2,R2,R5,L1,L2'.split(',')

let currentCoords = [0, 0]
let invert = false
let beenThere = new Set()

instructions.some((instruction, index) => {
  let isOdd = index%2 === 1

  let direction = instruction[0]
  let augment = parseInt(instruction.slice(1))

  augment = invert === (direction === "L" === isOdd) ? augment*=-1 : augment

  if(stepThrough(currentCoords.slice(), augment, index%2)) {
    return true
  }

  currentCoords[index%2] += augment
  invert = direction === "R" === isOdd ? !invert : invert

})

function stepThrough(currentStep, augment, index) {
  let abs = Math.abs(augment)
  while(abs > 0) {
    let test = currentStep.slice()
    augment > 0 ? test[index]++ : test[index]--

    // test the waters first, if we've hung there stop the presses
    if(beenThere.has(JSON.stringify(test))) {
      console.log(test.reduce((acc, coord) => acc + Math.abs(coord), 0))
      return true
      break
    }

    // if we haven't hung there yet, let's hang there
    augment > 0 ? currentStep[index]++ : currentStep[index]--
    beenThere.add(JSON.stringify(currentStep.slice()))
    abs--
  }
  return false
}
