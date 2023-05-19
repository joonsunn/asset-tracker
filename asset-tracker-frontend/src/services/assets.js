import axios from 'axios'
const baseUrl = '/api/blogs'
const assetsUrl = '/api/assets'
const transactionsUrl = '/api/transactions'
const searchUrl = '/api/assetSearch/search'
const priceUrl = '/api/assetSearch/chart'


let token = null
const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getUserAssets = async (id) => {
	const config = {
		headers : {
			Authorization: token
		}
	}

	const response = await axios.get(`${assetsUrl}/byuser/${id}`)
	return response.data
}

const getUserTransactions = async (id) => {
	const config = {
		headers : {
			Authorization: token
		}
	}

	const response = await axios.get(`${transactionsUrl}/byuser/${id}`)
	return response.data
}

const searchAsset = async (searchPhrase) => {
	const config = {
		headers : {
			Authorization: token
		}
	}
	const response = await axios.post(`${searchUrl}`, {q: searchPhrase}, config)
	return response.data
}

const getAssetPrice = async (symbol) => {
	const config = {
		headers : {
			Authorization: token
		}
	}

	const response = await axios.post(`${priceUrl}`, {symbol: symbol}, config)

	return {price: response.data.regularMarketPrice, currency: response.data.currency}
}

const updateAssetPrice = async (id, price) => {
	const config = {
		headers : {
			Authorization: token
		}
	}

	const data = {
		assetCurrentPrice: price
	}

	const response = await axios.put(`${assetsUrl}/${id}`, data, config)

	return response.data
}

const addAsset = async (assetObject) => {
	const config = {
		headers : {
			Authorization: token
		}
	}

	const data = assetObject

	const response = await axios.post(`${assetsUrl}`, data, config)

	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getOne = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (id, updatedBlog) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}



// eslint-disable-next-line
export default { setToken, getUserAssets, getUserTransactions, searchAsset, getAssetPrice, updateAssetPrice, addAsset}