// In this model, the same message is sent repeatedly. You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. Almost.

// All you need to do is figure out which character is most frequent for each position. 

const fs = require('fs')

let columns = []

let data = fs.readFileSync('10-repetition-input.txt', 'utf8')
 	.split('\n').map(el => el.split('')).forEach(line => {
 		line.forEach((char, idx) => {
 			columns[idx] ? columns[idx].push(char) : columns[idx] = [char]
 		})
 	})

console.log(columns.map(mostCommonCharacter).join(''))

function compareFrequencies(a, b) {
	return b.count - a.count
}

function mostCommonCharacter(arr) {
	let obj = {}

	arr.map(char => {
		char in obj ? obj[char]['count']++ : obj[char] = {'char':char, 'count':1}
  	})

	return Object.keys(obj)
	.map(key => obj[key])
	.sort(compareFrequencies)[0].char
}