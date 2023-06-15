const express = require("express");
const router = express.Router();

const userRouter = require("../router/userRouter");
const blogRouter = require("../router/blogrouter");
const commentRouter = require("../router/commentrouter");

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/comment",commentRouter);

module.exports = router;
