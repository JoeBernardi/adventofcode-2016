// You would also like to know which IPs support SSL (super-secret listening).

// An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or BAB, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as xyx or aba. A corresponding BAB is the same characters but in reversed positions: yxy and bab, respectively.

const fs = require('fs')

String.prototype.flipBAB = function() {
	return [this[1],this[0],this[1]].join('')
}

String.prototype.getFlippedBABs = function() {
	let babs = []

	this.split('').forEach((char, i, chars) => 
	chars[i+2] === char && chars[i+1] !== char
	? babs.push(chars.slice(i,i+2).join('').flipBAB()) 
	: '')
	return babs.length ? babs : false
}

let data = fs.readFileSync('inputs/12-TLS-input.txt', 'utf8')
			.split('\n')
			.map(line => line.split(/\[|\]/))
			.filter(supportsSSL)
			.length

function supportsSSL(arr) {
	const insideBrackets = arr.filter((el, idx) => idx%2 === 1)
	const outsideBrackets = arr.filter((el, idx) => idx%2 === 0)
	const abas = insideBrackets
				.map(el => el.getFlippedBABs())
				.filter(v => !!v)
				.reduce((acc, old) => acc.concat(old), [])

	return abas.length 
	? abas.some(aba => {
		return outsideBrackets
		.some(outsideBracket => outsideBracket
			.includes(aba))
	})
	: false
}

console.log(data)