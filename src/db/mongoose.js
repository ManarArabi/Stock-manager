const mongoose = require('mongoose')
const connectionUrl = config.get('mongoUrl');
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

module.exports = mongoose;