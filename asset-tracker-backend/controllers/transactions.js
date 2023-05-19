const jwt = require('jsonwebtoken')
const transactionsRouter = require('express').Router()
const Transaction = require('../models/transaction')
const User = require('../models/user')
const Asset = require('../models/asset')
const middleware = require('../utils/middleware')
const _ = require('lodash')

transactionsRouter.get('/', async (request, response) => {
	const transactions = await Transaction.find({})
	return response.json(transactions)
})

transactionsRouter.get('/:id', async (request, response) => {
	// Blog.findById(request.params.id)
	// 	.then(blog => {
	// 		if (blog) {
	// 			response.json(blog)
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))

	const transaction = await Transaction.findById(request.params.id)
	if (transaction) {
		response.json(transaction)
	} else {
		response.status(404).end()
	}
})

transactionsRouter.get('/byuser/:id', async (request, response) => {
	// Blog.findById(request.params.id)
	// 	.then(blog => {
	// 		if (blog) {
	// 			response.json(blog)
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
	// 	.catch(error => next(error))

	const allTransactions = await Transaction.find({}).populate('assetId', { assetClass: 1 })

	const userTransactions = allTransactions.filter(transaction => transaction.user.toString() === request.params.id)

	if (userTransactions) {
		// const userTransactions3 = _.groupBy(userTransactions, 'assetId.assetClass')
		const userTransactions2 = _.orderBy(userTransactions, 'transactionDate', 'desc')
		const userTransactions3 = _.groupBy(userTransactions2, 'assetId._id')
		// console.log(userTransactions3)
		response.json(userTransactions3)
	} else {
		response.status(404).end()
	}
})




transactionsRouter.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user

	if (!user) {
		return response.status(401).end()
	}

	const body = request.body

	const transaction = new Transaction({
		assetId: body.assetId,
		assetTicker: body.assetTicker,
		transactionDate: body.transactionDate,
		transactedPrice: body.transactedPrice,
		transactedUnits: body.transactedUnits,
		transactionDirection: body.transactionDirection,
		//TODO: add transaction currency
		user: user.id
	})

	const savedTransaction = await transaction.save()
	const assetToBeUpdatedTransaction = await Asset.findById(body.assetId)
	assetToBeUpdatedTransaction.assetTransactions = assetToBeUpdatedTransaction.assetTransactions.concat(savedTransaction._id)

	await assetToBeUpdatedTransaction.save()

	response.status(201).json(savedTransaction)

})

transactionsRouter.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const user = request.user

	if (!user) {
		return response.status(401).end()
	}

	await Transaction.findByIdAndRemove(request.params.id)

	response.status(204).end()
})

module.exports = transactionsRouter