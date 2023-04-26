const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('assets', { user: 0, likes: 0 })
	response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id).populate('assets', { assetTicker: 1, assetHoldingUnits: 1, assetTransactions: 1, assetName: 1 })
	if (user) {
		response.json(user)
	} else {
		return response.status(404).end()
	}
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (password.length < 3) {
		return response.status(401).json({ error: 'supplied password length less than minimum length of 3 characters' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter