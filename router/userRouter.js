const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/imageStorage");
const validate = require("../Validators/user/user_validation");
const user = require("../controller/userController");

router.post("/login", user.loginApi);
router.post("/forgotpassword", user.forgetPasswordApi);
router.post("/resetpassword/:userId/:token", validate.resetUserValidation, user.resetPasswordApi);
router.post("/signup", upload.single("profilePic"), validate.registerUserValidation, user.singnupApi);

module.exports = router;
