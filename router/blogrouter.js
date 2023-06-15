const express = require("express");
const router = express.Router();
const blog = require("../controller/blogController");
const { upload } = require("../middleware/imageStorage");

router.get("/viewlist", blog.listOfBlog);
router.patch("/updateblog/:blogId", blog.updateBlogApi);
router.delete("/removeblog/:blogId", blog.removeBlogApi);
router.post("/like/:blogId/:blogLike", blog.likeAndDislike);
router.post("/addblog", upload.single("blogImg"), blog.addBlog);

module.exports = router;
