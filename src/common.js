const Category = require('./models/category')
const Item = require('./models/item')

const getChildCategories = async (parentCategoryId) => {
	return await Category.find({ parentCategory: parentCategoryId })
}

const getChildItems = async (parentCategoryId) => {
	return await Item.find({ category: parentCategoryId })
}

const getAllChildren = async (parentCategoryId) => {
	const categories = getChildCategories(parentCategoryId)
	const items = getChildItems(parentCategoryId)
	categories.forEach((c) => {
		let tmp = getChildCategories(c._id)
		let tmp2 = getChildItems(c._id)
		if (tmp) {
			categories.concat(tmp)
		}
		if (tmp2) {
			items.concat(tmp2)
		}
	})
	categories.concat(items)
	return categories
}

module.exports = getAllChildren