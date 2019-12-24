const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	Counter: {
		type: Number,
		min: [0, 'can\'t be less than zero']
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item