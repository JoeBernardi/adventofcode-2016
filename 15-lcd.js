// After you swipe your card, what code is the screen trying to display?

const fs = require('fs')

let data = fs.readFileSync('inputs/14-lcd-input.txt', 'utf8')
			.replace(/ by/g,'')
			.split('\n')
			.map(line => line.split(' '))

const operations = {
	signs: ["🕶", "🍍"],
	board: createBoard(),

	rect: function(args) {
		[width, height] = args[0].split("x")
		let i = 0
		while(i < height) {
			let j = 0
			while(j < width) {
				this.board[i][j] = 1
				j++
			}
			i++
		}
		this.print()
	},

	rotate: function(args) {
		args[0] === "row" ? this.rowRotate(args.slice(1,args.length)) : this.columnRotate(args.slice(1,args.length))
		this.print()
	},

	rowRotate: function(args) {
		const row = args[0].split("=")[1]
		const amount = args[1]
		const newRow = this.board[row].map((cell, idx, oldRow) => {
			const newVal = (oldRow.length - amount + idx)%oldRow.length
			return oldRow[newVal]
		})
		this.board[row] = newRow
	},

	columnRotate: function(args) {
		const column = args[0].split("=")[1]
		const amount = args[1]
		const newBoard = this.board.map((row, idx, oldBoard) => {
			const newVal = (oldBoard.length - amount + idx)%oldBoard.length
			let newRow = [...row]
			newRow[column] = oldBoard[newVal][column]
			return newRow
		})
		this.board = newBoard
	},

	print: function() {
		this.board.forEach(row => {
			console.log(row.map(digit => ` ${this.signs[digit]} `).join(''))
		})
		console.log("\n\n\n\n\n\n")
	}
}

function createBoard() {
	let board = [],
		i = j = 0
	while(i < 6) {
		board.push(Array(50).fill(0))
		i++
	}
	return board
}

data.forEach(el => operations[el[0]](el.slice(1,el.length)))