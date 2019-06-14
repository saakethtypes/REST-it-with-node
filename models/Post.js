const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:2,
        max:40,
    },
    content:{
        type:String,
        required:true,
        max:300
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Post',PostSchema)

