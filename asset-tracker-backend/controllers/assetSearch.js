const assetSearchRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const middleware = require('../utils/middleware')


const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' }

const searchUrl = config.SEARCH_URL
const chartUrl = config.CHART_URL

assetSearchRouter.post('/search', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const params = request.body
	const user = request.user
	console.log(user.id)

	// const searchResult = await axios.get(searchUrl, { params }, { headers }) //uncomment when using live API
	// const quotes = searchResult.data.quotes //uncomment when using live API

	const searchResult = JSON.parse(config.SEARCH_RESULTS)

	const quotes = searchResult

	if (quotes) {
		console.log(`request params: ${JSON.stringify(params)}`)
		response.json(quotes)
	} else {
		response.json([])
	}

})

assetSearchRouter.post('/chart', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const params = request.body
	const user = request.user
	console.log(user.id)

	// const searchResult = await axios.get(chartUrl) //uncomment when using live API
	// const quoteData = searchResult.data //uncomment when using live API

	const quoteData = JSON.parse(config.CHART_RESULTS)

	if (quoteData) {
		// console.log(`request.params: ${JSON.stringify(params)}`)
		console.log(`symbol: ${params.symbol}`)
		response.json(quoteData)
	}
})


module.exports = assetSearchRouter