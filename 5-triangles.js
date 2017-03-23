// Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.

const fs = require('fs')
let valids = 0

let data = fs.readFileSync('inputs/5-triangles-input.txt', 'utf8').trim()
  .split('\n')
  .map(line => line.trim().split(/\s+/).map(side => +side))

function transposeArrays(data) {
  return data.map((row, rowNumber, data) => {
    let coeff = rowNumber%3*-1
    return [data[rowNumber+coeff][Math.abs(coeff)],
            data[rowNumber+coeff+1][Math.abs(coeff)],
            data[rowNumber+coeff+2][Math.abs(coeff)]]
  })
}

data = transposeArrays(data)

data.forEach(
  (tri) => {
    isValidTriangle(...tri.map((side) => parseInt(side))) ? valids++ : ''
  }
)

console.log(valids)

function isValidTriangle(a,b,c) {
  return ((a + b > c) && (a + c > b) && (b + c > a))
}
