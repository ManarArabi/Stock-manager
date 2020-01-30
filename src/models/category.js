const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	parentCategory: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
}, { autoIndex: false });

categorySchema.index({ parentCategory: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema)

module.exports = Category