// The eight-character password for the door is generated one character at a time by finding the MD5 hash of some Door ID (your puzzle input) and an increasing integer index (starting with 0).

// A hash indicates the next character in the password if its hexadecimal representation starts with five zeroes. If it does, the sixth character in the hash is the next character of the password.

const cp = require('child_process')

const input = 'ugkcyxxp'
const numberOfWorkers = 4
let pass = [],
    workerProcesses = []

for(let i=0; i<numberOfWorkers; i++) {
  workerProcesses.push(
    cp.fork('./modules/8-hash-module', [i, numberOfWorkers, input])
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
  console.log(passObj)
  !pass.find(obj => passObj.salt === obj.salt) ? pass.push(passObj) : ''
  pass.length === 8 ? killWorkers() : sendMessageToWorkers(pass)
  console.log(pass.sort((a, b) => a.salt - b.salt).map(obj => obj.char).join(','))
}