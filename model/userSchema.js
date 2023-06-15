const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {
         type: String,
         required : true,   

    },
    userEmail: {
        type: String,
        
    },
    userPassword: {
        type: String,
       
        default: false
    },

    userMobile: {
        type: Number,
        
    },
    userCity: {
        type: String,
       
    },
    userState: {
        type: String,
        
    },
   
   userAddress: {
        type: String,
   
    },
   
    profilePic: {
        type: String,
    },

    isActive: {
        type: Boolean,
        //require: true,
        default: true
    },
    userRole: {
        type: String,
        default: "user",
    },
})
userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)