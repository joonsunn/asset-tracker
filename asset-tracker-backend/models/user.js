const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	name: {
		first: {
			type: String
		},
		last: {
			type: String
		}
	},
	passwordHash: {
		type: String,
		required: true,
		minLength: 3
	},
	assets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Asset'
		}
	],
})

userSchema.plugin(uniqueValidator)

// userSchema.set('strictPopulate', false)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User