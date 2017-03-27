// The format compresses a sequence of characters. Whitespace is ignored. To indicate that some sequence should be repeated, a marker is added to the file, like (10x2). To decompress this marker, take the subsequent 10 characters and repeat them 2 times. Then, continue reading the file after the repeated data. The marker itself is not included in the decompressed output.

const fs = require('fs')
const assert = require('assert')

let data = fs.readFileSync('inputs/16-compression-input.txt', 'utf8')

function countUncompressedCharacters(string) {
	const re = /\((\d+)x(\d+)\)/g

	let results,
	lastIndex = 0,
	lastCharsToIgnore = 0
	addedChars = 0

	while((results = re.exec(string)) !== null) {
		const ignoreMe = results.index < (lastIndex + lastCharsToIgnore)
		if(!ignoreMe){
			const compressors = results[0].replace(/\(|\)|/g,'').split('x')
			const charAugment = compressors.reduce((acc, num) => acc*(num-1)-results[0].length)
			lastIndex = results.index
			lastCharsToIgnore = parseInt(compressors[0])+results[0].length
			addedChars += charAugment
		}
	}
	return string.length + addedChars
}

assert.deepStrictEqual(countUncompressedCharacters('(3x3)XYZ'), 9);
assert.deepStrictEqual(countUncompressedCharacters('ADVENT'), 6);
assert.deepStrictEqual(countUncompressedCharacters('A(1x5)BC'), 7);
assert.deepStrictEqual(countUncompressedCharacters('A(2x2)BCD(2x2)EFG'), 11);
assert.deepStrictEqual(countUncompressedCharacters('(6x1)(1x3)A'), 6);
assert.deepStrictEqual(countUncompressedCharacters('X(8x2)(3x3)ABCY'), 18);

console.log(countUncompressedCharacters(data))