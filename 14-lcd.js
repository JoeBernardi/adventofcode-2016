// There seems to be an intermediate check of the voltage used by the display: after you swipe your card, if the screen did work, how many pixels should be lit?

const fs = require('fs')

let data = fs.readFileSync('inputs/14-lcd-input.txt', 'utf8')
			.replace(/ by/g,'')
			.split('\n')
			.map(line => line.split(' '))

const operations = {
	squares: 0,
	rect: function(dimensions) {
		this.squares += dimensions.split("x").reduce((a,v) => a*v)
	},
	rotate: function(dimensions){
		// don't need this one.
	}
}

data.forEach(el => operations[el[0]](el[1]))

console.log(operations.squares)