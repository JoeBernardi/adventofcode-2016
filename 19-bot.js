// What do you get if you multiply together the values of one chip in each of outputs 0, 1, and 2?

const fs = require('fs')

let data = fs.readFileSync('inputs/18-bot-input.txt', 'utf8').split('\n')

const botNet = []
const outputNet = []
const specialCards = [61,17]

function createBot(id, lowPass, highPass){
	bot = {
		id,
		passesTo: [lowPass, highPass],
		holding: [],
		get hasHandsFull() {
			return this.holding.length > 1
		},
		get isTheChosenBot() {
			return this.hasHandsFull && this.holding.every(card => specialCards.includes(+card))
		},
		acceptChip: function(chipId) {
			this.holding.push(chipId)
			if(this.isTheChosenBot) console.log(`Robot #${this.id} is the chosen robot.`)
			if(this.hasHandsFull) this.giveOutChips()
		},
		giveOutChips: function() {
			this.holding.sort((a,b) => a - b).map((chip, idx) => {
				if(this.passesTo[idx][0] !== 'bot') return false
				const robot = findBot(this.passesTo[idx][1])
				robot.acceptChip(chip)
			})
			this.holding = []
		}
	}
	return bot
}

function findBot(id) {
	return botNet.find(bot => bot.id === +id)
}

function distributeChips(data) {
	data.filter(line => line.includes("goes"))
	.forEach((rule, idx) => {
		const ids = rule.match(/(\d+)/g)
		findBot(ids[1]).acceptChip(ids[0])
	})
}

function getRules(data) {
	data.filter(line => line.includes("gives"))
	.forEach(rule => {
		const ids = rule.match(/([a-z]{3,6})\s(\d+)/g)
		botNet.push(createBot(+ids.shift().match(/(\d+)/g).shift(), ...ids.map(id => id.split(' ')))) // lol
	})
}

getRules(data)
distributeChips(data)

console.log(outputNet.slice(0,3).reduce((acc, val) => acc * val))