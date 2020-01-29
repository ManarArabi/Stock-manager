const Item = require('../models/item')
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/item', auth, async (req, res) => {
	const item = new Item({
		name: req.body.name,
		counter: req.body.counter,
		category: req.body.category,
		owner: req.user._id
	})
	try {
		await item.save()
		res.status(201).send(item)
	} catch (e) {
		res.status(400).send()
	}
})

//not working
router.delete('/item/:id', auth, async (req, res) => {
	const _id = req.params.id
	try {
		const item = await Item.findOne({ _id })
		console.log(typeof item.owner)
		console.log(typeof req.user._id)
		console.log(item.owner.equals(req.user._id))
		if (item.owner.equals(req.user._id)) {
			res.status(403).send("You aren't the owner of this item, you can't delete it.")
		}
		item = await Item.findOneAndDelete({ _id })
		res.status(200).send(item)
	} catch (e) {
		res.status(400).send()
	}
})

module.exports = router