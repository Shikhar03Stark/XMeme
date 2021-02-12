const mongoose = require('mongoose');
//Scheme Pattern
//Connect to Local DB
let dbUrl;
if(process.env.DOCKER == 'TRUE'){
    dbUrl = 'mongodb://mongo:27017/xmeme';
}
else{
    dbUrl = 'mongodb://localhost:27017/xmeme';
}
console.log(`DB URL : ${dbUrl}`);
const conn = mongoose.createConnection(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

module.exports = conn;