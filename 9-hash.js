// Instead of simply filling in the password from left to right, the hash now also indicates the position within the password to fill. You still look for hashes that begin with five zeroes; however, now, the sixth character represents the position (0-7), and the seventh character is the character to put in that position.

// A hash result of 000001f means that f is the second character in the password. Use only the first result for each position, and ignore invalid positions.

const cp = require('child_process')

const input = 'ugkcyxxp'
const numberOfWorkers = 4
let pass = [],
    workerProcesses = []

for(let i=0; i<numberOfWorkers; i++) {
  workerProcesses.push(
    cp.fork('./9-hash-module', [i, numberOfWorkers, input])
    .on('message', obj => updatePass(obj))
  )
}

function sendMessageToWorkers(msg) {
  workerProcesses.forEach(process => { 
    process.send(msg)
  }) 
}

function killWorkers() {
  workerProcesses.forEach(process => { 
    process.kill()
  }) 
}

function updatePass(passObj) {
  !pass.find(obj => passObj.pos === obj.pos) ? pass.push(passObj) : ''
  console.log(passObj)
  pass.length === 8 ? killWorkers() : sendMessageToWorkers(pass)
  console.log(pass.sort((a, b) => a.pos - b.pos).map(obj => obj.char).join(''))
}