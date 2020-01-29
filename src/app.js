
global.config = require('config');
global.mongoose = require('./db/mongoose');

const express = require('express')
const user_router = require('./routers/user')
const item_router = require('./routers/item')

const app = express()
const port = process.env.PORT || config.get('port');

app.use(express.json())
app.use(user_router)
app.use(item_router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})