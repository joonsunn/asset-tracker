const assetSearchRouter = require('express').Router()
const axios = require('axios')
const config = require('../utils/config')
const middleware = require('../utils/middleware')


const headers = { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' }

const searchUrl = config.SEARCH_URL
const chartUrl = config.CHART_URL
//CHART_URL2 = 'https://query2.finance.yahoo.com/v8/finance/chart/4715.KL?formatted=true&includeAdjustedClose=true&interval=1d&period1=1682899200&period2=1683469768'

assetSearchRouter.post('/search', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	const params = request.body
	const user = request.user
	console.log(user.id)

	const searchResult = await axios.get(searchUrl, { params }, { headers }) //uncomment when using live API
	const quotes = searchResult.data.quotes //uncomment when using live API

	// const searchResult = JSON.parse(config.SEARCH_RESULTS) //comment out when using live API

	// const quotes = searchResult.quotes // comment out when using live API

	if (quotes) {
		console.log(`request params: ${JSON.stringify(params)}`)
		response.json(quotes)
	} else {
		response.json([])
	}

})

assetSearchRouter.post('/chart', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
	// const params = request.body
	const symbol = request.body.symbol
	const user = request.user
	console.log(user.id)
	// const symbol = request.params.symbol

	const searchResult = await axios.get(`${chartUrl}/${symbol}`) //uncomment when using live API
	const quoteData = searchResult.data.chart.result[0].meta //uncomment when using live API

	// const quoteData = JSON.parse(config.CHART_RESULTS)

	if (quoteData) {
		// console.log(`request.params: ${JSON.stringify(params)}`)
		console.log(`symbol: ${symbol}`)
		response.json(quoteData)
	}
})

assetSearchRouter.get('/chart/:symbol', async (request, response) => {
	// const params = request.body
	// const symbol = request.body.symbol
	// const user = request.user
	// console.log(user.id)
	const symbol = request.params.symbol

	const searchResult = await axios.get(`${chartUrl}/${symbol}`) //uncomment when using live API
	const quoteData = searchResult.data.chart.result[0].meta.regularMarketPrice //uncomment when using live API

	// const quoteData = JSON.parse(config.CHART_RESULTS)

	if (quoteData) {
		// console.log(`request.params: ${JSON.stringify(params)}`)
		console.log(`symbol: ${symbol}`)
		response.json(quoteData)
	}
})


module.exports = assetSearchRouter