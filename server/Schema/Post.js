const mongoose = require('mongoose');

//Schema Pattern

const postSchema = new mongoose.Schema({
    id:{
        type: mongoose.SchemaTypes.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    name : {
        type : String,
        required: true,
        index: true,
    },
    caption : {
        type : String,
        required : true,
        index: true,
    },
    url : {
        type : String,
        required : true,
    },
    postedOn : {
        type : Date,
        required : true,
        default : Date.now,
    },
    lastEdit : {
        type : Date, 
        requried : false,
        default : Date.now,
    },
    upvotes : {
        type : Number,
        required : false,
        default: () => 0,
    },
    downvotes : {
        type : Number,
        required : false,
        default : () => 0,
    },
});

//export Schema
module.exports = postSchema;