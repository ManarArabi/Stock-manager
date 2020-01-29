global.mongoose = require('./db/mongoose');

const express = require('express')
const user_router = require('./routers/user')
const item_router = require('./routers/item')
const category_router = require('/routers/category')

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(user_router)
app.use(item_router)
app.use(category_router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})