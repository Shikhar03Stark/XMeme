const mongoose = require('mongoose');
//Scheme Pattern
//Connect to Local DB
const dbUrl = 'mongodb://localhost:27017/xmeme';
const conn = mongoose.createConnection(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

module.exports = conn;