const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
	assetClass: {
		type:String,
		required: true
	},

	assetName: {
		type: String,
		required: true
	},

	assetTicker: {
		type: String,
		required: true
	},
	assetCurrency: {
		type: String,
		required: true
	},

	assetCurrentPrice: {
		type: Number,
		default: 0
	},
	assetCostBasis: {
		type: Number,
		default: 0
	},
	assetHoldingUnits: {
		type: Number,
		default: 0
	},
	assetTransactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Transaction'
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

assetSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Asset', assetSchema)