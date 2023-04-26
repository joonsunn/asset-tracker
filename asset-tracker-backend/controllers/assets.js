const jwt = require('jsonwebtoken')
const assetsRouter = require('express').Router()
const Asset = require('../models/asset')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const middleware = require('../utils/middleware')

assetsRouter.get('/', async (request, response) => {

	const assets = await Asset.find({}).populate('user', { username: 1, name: 1, id: 1 })
	return response.json(assets)
})

assetsRouter.get('/:id', async (request, response) => {
	// Blog.findById(request.params.id)
	// 	.then(blog => {
	// 		if (blog) {
	// 			response.json(blog)
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))

	const asset = await Asset.findById(request.params.id).populate('user assetTransactions', { username: 1, name: 1, id: 1, transactionDate: 1, transactedPrice: 1, transactedUnits: 1, transactionDirection: 1 })
	// const asset = await Asset.findById(request.params.id).populate({ path: 'user assetTransactions' })
	if (asset) {
		response.json(asset)
	} else {
		response.status(404).end()
	}
})
assetsRouter.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user

	if (!user) {
		return response.status(401).end()
	}

	const body = request.body

	const asset = new Asset({
		assetClass: body.assetClass,
		assetName: body.assetName,
		assetTicker: body.assetTicker,
		assetCurrentPrice: body.assetCurrentPrice,
		assetHoldingUnits: body.assetHoldingUnits,
		assetCurrency: body.assetCurrency,
		user: user.id
	})

	const savedAsset = await asset.save()
	user.assets = user.assets.concat(savedAsset._id)
	await user.save()

	response.status(201).json(savedAsset)
})

assetsRouter.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {

	const user = request.user

	const assetToBeDeleted = await Asset.findById(request.params.id)

	if (assetToBeDeleted.user.toString() === user.id.toString()) {
		await Asset.findByIdAndRemove(request.params.id)
		const newUserAssets = await user.assets.filter(asset => asset.toString() !== assetToBeDeleted.id)
		user.assets = newUserAssets
		await user.save()
		console.log(`Asset entry with id ${request.params.id}, ticker ${assetToBeDeleted.assetTicker}, with holding units ${assetToBeDeleted.assetHoldingUnits} successfully deleted.`)

		const allTransactions1 = await Transaction.find({})
		const allTransactions = allTransactions1.filter(transaction => transaction.assetId === assetToBeDeleted.id.toString())
		console.log('all transactions:', allTransactions)

		// while (allTransactions.length > 0) {
		// 	await Transaction.findByIdAndRemove(allTransactions[0]._id.toString())
		// 	allTransactions.pop(allTransactions[0])
		// }

		const removeTransaction = async (id) => {
			await Transaction.findByIdAndRemove(id)
		}
		allTransactions.map(transaction => removeTransaction(transaction.id.toString()))

		response.status(204).end()
	} else {
		return response.status(401).send({ error: 'Unauthorised deletion. Deletion aborted.' }).end()
	}

})

assetsRouter.put('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user

	if (!user) {
		return response.status(401).end()
	}

	const body = request.body

	// const asset = new Asset({
	// 	// assetClass: body.assetClass,
	// 	// assetName: body.assetName,
	// 	// assetTicker: body.assetTicker,
	// 	// assetCurrentPrice: body.assetCurrentPrice,
	// 	assetHoldingUnts: body.assetHoldingUnits
	// 	// assetCurrency: body.assetCurrency
	// })

	const originalAssetToBeUpdated = await Asset.findById(request.params.id)

	const asset = {
		assetHoldingUnits: body.assetHoldingUnits,
		assetCurrentPrice: body.assetCurrentPrice,
	}

	if (originalAssetToBeUpdated.user.toString() === user.id.toString()) {
		console.log(asset.assetTransactions)
		console.log(originalAssetToBeUpdated.assetTransactions)
		const updatedAsset = await Asset.findByIdAndUpdate(request.params.id, asset, { new: true })
		response.json(updatedAsset)
	} else {
		return response.status(401).send({ error: 'Unauthorised action. Action aborted.' }).end()
	}

})

module.exports = assetsRouter