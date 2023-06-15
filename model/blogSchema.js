const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({

    blogTilte: {
        type: String,

    },
    blogDetails: {
        type: String,

    },
    blogImg: {
        type: String,

    },
    blogStatus: {
        type: Boolean,
        default: true

    },
    blogLike: {
        type: Boolean,
        default: true,

    },
    blogRole: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    isActive: {
        type: Boolean,
        default: true

    }
})


blogSchema.set('timestamps', true)
module.exports = mongoose.model('blog', blogSchema)