const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/sign-up', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		res.status(201).send(user)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.login(req.body.email, req.body.password)
		const token = await user.generateToken()

		res.send({ user, token })
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
})

module.exports = router
