// Some of the instructions specify that a specific-valued microchip should be given to a specific bot; the rest of the instructions indicate what a given bot should do with its lower-value or higher-value chip.

// For example, consider the following instructions:

// value 5 goes to bot 2
// bot 2 gives low to bot 1 and high to bot 0
// value 3 goes to bot 1
// bot 1 gives low to output 1 and high to bot 0
// bot 0 gives low to output 2 and high to output 0
// value 2 goes to bot 2


const fs = require('fs')

let data = fs.readFileSync('inputs/18-bot-input.txt', 'utf8').split('\n')

const botNet = []
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