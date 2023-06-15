const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({
    comment_title:{
        type: String,
    },
    comment_description:{
        type: String,
    },
    like:{
        type: Number,
        default: 0,

    },
    isActive :{
        type:Boolean,
        default: true
    }
    
})
commentSchema.set('timestamps', true)
module.exports = mongoose.model('comment', commentSchema)