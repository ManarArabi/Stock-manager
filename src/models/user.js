const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('This is invalid Email')
			}
		}
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		default: 0,
		min: [0, 'Age can\'t be less than zero']
	}
});

userSchema.plugin(uniqueValidator);
userSchema.pre('save', async function(next){
	const user = this
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

userSchema.methods.toJSON = function() {
	const user = this
	const userObject = user.toObject()
	delete userObject.password

	return userObject
}
const User = mongoose.model('User', userSchema)



module.exports = User