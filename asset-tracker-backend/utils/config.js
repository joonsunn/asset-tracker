require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI
const SEARCH_URL = process.env.SEARCH_URL
const CHART_URL = process.env.CHART_URL2
const SEARCH_RESULTS = process.env.SEARCH_RESULTS
const CHART_RESULTS = process.env.CHART_RESULTS

module.exports = {
	MONGODB_URI,
	PORT,
	SEARCH_URL,
	CHART_URL,
	SEARCH_RESULTS,
	CHART_RESULTS
}