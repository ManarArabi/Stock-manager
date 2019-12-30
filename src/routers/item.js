const Item = require('../models/item')
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/item', auth, async (req, res) => {
	const item = new Item({
		name: req.body.name,
		counter: req.body.counter,
		category: req.body.category,
		user: req.user._id
	})
	try {
		await item.save()
		res.status(201).send(item)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
})

module.exports = router