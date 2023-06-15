const User = require("../model/userSchema");

const  checkExistUser = async (req, res, next) => {
    const { userEmail } = req.body
    //console.log('****', req.body.userEmail)
const isUserExists=await User.findOne({userEmail:userEmail})
if(isUserExists){
    return res.status(400).json({
        status:"failed",
        message:"User with this email is already exist"
    })
}else{
    next();
}
};
module.exports={ checkExistUser };