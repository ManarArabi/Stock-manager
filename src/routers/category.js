const Category = require('./../models/category')
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/category', auth, async (req, res) => {
	const category = new Category({
		name: req.body.name,
		parentCategory: req.body.counter,
		owner: req.user._id
	})
	try {
		await category.save()
		res.status(201).send(category)
	} catch (e) {
		res.status(400).send(e)
	}
})

module.exports = router