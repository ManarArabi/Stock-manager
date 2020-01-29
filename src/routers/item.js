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

router.delete('/item/:id', auth, async (req, res) => {
	const _id = req.params.id
	try {
		const item = await Item.findOne({ _id })
		if (req.user._id.toString() != item.owner.toString()) {
			res.status(403).send("You aren't the owner of this item, you can't delete it.")
		}
		else {
			await item.remove()
			if (!item) {
				res.status(404).send()
			}
			res.status(200).send(item)
		}
	} catch (e) {
		res.status(500).send()
	}
})


router.patch('/item/:id', auth, async (req, res) => {

	const allowedUpdates = ["category", "name", "counter"]
	const updates = Object.keys(req.body)
	const isAllowed = updates.every((update) => allowedUpdates.includes(update))

	if (!isAllowed) {
		res.status(400).send('Invalid updates')
	}

	try {
		const _id = req.params.id
		let item = await Item.findOne({ _id })

		if (req.user._id.toString() != item.owner.toString()) {
			res.status(403).send("You aren't the owner of this item, you can't delete it.")
		}

		updates.forEach((update) => {
			item[update] = req.body[update]
		})
		await item.save()
		res.status(200).send(item)
	} catch (e) {
		res.status(400).send()
	}
})

module.exports = router