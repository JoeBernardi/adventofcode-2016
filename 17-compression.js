// Apparently, the file actually uses version two of the format.

// In version two, the only difference is that markers within decompressed data are decompressed. This, the documentation explains, provides much more substantial compression capabilities, allowing many-gigabyte files to be stored in only a few kilobytes.

const fs = require('fs')
const assert = require('assert')

let data = fs.readFileSync('inputs/16-compression-input.txt', 'utf8')

function countUncompressedCharacters(string, totalSoFar = 0) {
	const re = /\((\d+)x(\d+)\)/g
	const { 0: match, 1: distance, 2: factor, index } = re.exec(string) || false
	if(!match) return totalSoFar + string.length

	const sectionEnd = match.length + index + (+distance)
	const uncompressedSectionLength = +factor * countUncompressedCharacters(string.slice(sectionEnd - +distance, sectionEnd))

	return countUncompressedCharacters(string.slice(sectionEnd), totalSoFar + index + uncompressedSectionLength)
}

assert.deepStrictEqual(countUncompressedCharacters('(3x3)XYZ'), 9);
assert.deepStrictEqual(countUncompressedCharacters('ADVENT'), 6);
assert.deepStrictEqual(countUncompressedCharacters('X(8x2)(3x3)ABCY'), 20);
assert.deepStrictEqual(countUncompressedCharacters('(27x12)(20x12)(13x14)(7x10)(1x12)A'), 241920);
assert.deepStrictEqual(countUncompressedCharacters('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'), 445);

console.log(countUncompressedCharacters(data))

// find a compressor, grab its entire contents
// inner loop( 
	// get the uncompressed length of that section (factor*(factor*(factor*number of letters))))
//)
// start on the main string again, at the end of that section
// increment totalSoFar with the index (effectively the number of orphan characters that are between sections) 
// and the uncompressed section length