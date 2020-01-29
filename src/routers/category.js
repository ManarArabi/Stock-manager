const category = require('./../models/category')
const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()

module.exports = router