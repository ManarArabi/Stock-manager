const express = require('express')
require('../db/mongoose')
const Category = require('../models/category')


const app = express()
const port = 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})