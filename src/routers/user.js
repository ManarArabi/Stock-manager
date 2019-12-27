const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/sign-up', async (req, res) => {
	//TODO
	//generate token and return it
	const user = new User(req.body)
	try {
		await user.save()
		res.status(201).send(user)
	} catch (e) {
		res.status(400).send(e)
	}
})

module.exports = router
