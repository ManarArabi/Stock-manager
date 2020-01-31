const Category = require('./../models/category')
const express = require('express')
const auth = require('../middleware/auth')
const common = require('./../common')
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

router.patch('/category/:id', auth, async (req, res) => {

	const allowedUpdates = ["name", "parentCategory"]
	const updates = Object.keys(req.body)
	const isAllowed = updates.every((update) => allowedUpdates.includes(update))

	if (!isAllowed) {
		res.status(400).send('Invalid updates')
	}

	try {
		const _id = req.params.id
		let category = await Category.findOne({ _id })

		if (req.user._id.toString() != category.owner.toString()) {
			res.status(403).send("You aren't the owner of this category, you can't update it.")
		}

		updates.forEach((update) => {
			category[update] = req.body[update]
		})
		await category.save()
		res.status(200).send(category)
	} catch (e) {
		res.status(400).send()
	}
})

router.delete('/category/:id', auth, async (req, res) => {
	const _id = req.params.id
	try {
		const category = await Category.findOne({ _id })
		if (req.user._id.toString() != item.owner.toString()) {
			res.status(403).send("You aren't the owner of this category, you can't delete it.")
		}
		else {
			if (!category) {
				res.status(404).send()
			}
			await category.remove()
			const allChildren = await common.getAllchildren(category._id)
			allChildren.forEach(async (c) => {
				await c.remove()
			})
			res.status(200).send(category)
		}
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router