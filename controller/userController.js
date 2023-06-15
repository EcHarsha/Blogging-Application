const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transpoter } = require("../services/mailServices");

// SignUP
const singnupApi = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const userData = new User(req.body);
  try {
    const isUserExists = await User.findOne({ userEmail: userEmail });
    if (isUserExists) {
      return res.status(409).json({
        success: false,
        error: "email already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(userPassword, salt);
      userData.profilePic = `/uploads/${req.file.filename}`;
      await userData.save();
      return res.status(201).json({
        success: true,
        message: "Registration Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//Login API
const loginApi = async (req, res) => {
  const loginUser = await User.findOne({ userEmail: req.body.userEmail });
  try {
    if (loginUser) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        loginUser.userPassword
      );
      const token = jwt.sign({ userId: loginUser._id }, process.env.JWT, {
        expiresIn: "5d",
      });
      if (loginUser && hashPassword) {
        res.status(200).json({
          success: true,
          message: "Login Successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "userEmail not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Forgotten Api
const forgetPasswordApi = async (req, res) => {
  const forgetId = await User.findOne({
    userEmail: req.body.userEmail,
  });
  try {
    if (forgetId != null) {
      const token = jwt.sign(
        { userid: forgetId._id, userEmail: forgetId.userEmail },
        process.env.JWT,
        { expiresIn: "30m" }
      );
      const link = `http://127.0.0.1:3000/api/user/resetPassword/${forgetId._id}/${token}`;
      await transpoter.sendMail({
        from: process.env.EMAIL,
        to: req.body.userEmail,
        subject: "Password recovery Link",
        html: `<p>below link is valid only for 30 minutes</p><a href=${link}}>Click on link to reset the password</a>`,
      });
      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        token: token,
        UserId: forgetId._id,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//reset password
const resetPasswordApi = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await User.findById(userId);
    if (checkUser != null) {
      jwt.verify(token, process.env.JWT, async (err) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
          });
        }
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const newUserPassword = await bcrypt.hash(newPassword, salt);
          await User.findByIdAndUpdate(checkUser._id, {
            $set: { userPassword: newUserPassword },
          });
          return res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          return res.status(403).json({
            success: false,
            message: "NewPassword and ConfirmPassword do not match",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  singnupApi,
  loginApi,
  forgetPasswordApi,
  resetPasswordApi,
};
