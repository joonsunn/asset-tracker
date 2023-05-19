const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
	assetTicker: {
		type: String,
		required: true
	},
	assetId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Asset',
		required: true
	},
	transactionDate: {
		type: String,
		required: true
	},
	transactedPrice: {
		type: Number,
		required: true
	},
	transactedUnits: {
		type: Number,
		required: true
	},
	transactionDirection: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

	//TODO: add transaction currency
})

transactionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Transaction', transactionSchema)