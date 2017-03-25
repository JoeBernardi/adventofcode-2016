// An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

const fs = require('fs')

let data = fs.readFileSync('inputs/12-TLS-input.txt', 'utf8')
			.split('\n')
			.map(line => line.split(/\[|\]/))
			.filter(supportsTLS)
			.length

function supportsTLS(arr) {
	const insideBrackets = arr.filter((el, idx) => idx%2 === 1)
	const outsideBrackets = arr.filter((el, idx) => idx%2 === 0)
	return outsideBrackets.some(el => hasABBA(el)) && insideBrackets.every(el => !hasABBA(el))
}

function hasABBA(str) {
	return str.split('').some((char, index, str) => {
		if(index < 3) return false
		return str[index-1] === str[index-2] 
		&& str[index-3] === char 
		&& char !== str[index-1]
	})
}

console.log(data)