const mongoose = require('mongoose')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

userSchema.statics.login = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new exception('User is not found')
	}
	const match = await bcrypt.compare(password, user.password)
	if (!match) {
		throw new exception('Wrong password')
	}
	return user
}

userSchema.methods.generateToken = async function () {
	const user = this
	const token = await jwt.sign({ _id: user._id.toString() }, config.get('jwtSignature'))
	return token
}

const User = mongoose.model('User', userSchema)

module.exports = User