const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/sign-up', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		res.status(201).send(user)
	} catch (e) {
		res.status(400).send()
	}
})

router.post('/login', async (req, res) => {
	try {
		const user = await User.login(req.body.email, req.body.password)
		const token = await user.generateToken()

		res.send({ user, token })
	} catch (e) {
		res.status(400).send()
	}
})

router.patch('/user', auth, async (req, res) => {
	const allowedUpdates = ["name", "email", "password", "age"]
	const updates = Object.keys(req.body)
	const isAllowed = updates.every((update) => allowedUpdates.includes(update))

	if (!isAllowed) {
		res.status(400).send('Invalid updates')
	}
	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})
		await req.user.save()
		res.status(200).send(req.user)
	} catch (e) {
		res.status(400).send()
	}
})

module.exports = router
