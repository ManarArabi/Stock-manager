require('./db/mongoose')
const express = require('express')
const user_router = require('./routers/user')

const app = express()
const port = 3000

app.use(express.json())
app.use(user_router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})