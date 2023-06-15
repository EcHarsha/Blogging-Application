const blog = require("../model/blogSchema");

const addBlog = async (req, res) => {
  try {
    const blogData = new blog(req.body);
    if (blogData != "") {
      blogData.blogImg = `/uploads/${req.file.filename}`;
      await blogData.save();
      return res.status(200).json({
        success: true,
        message: "Congratulation!! your blog created Successfully",
        blogData: blogData,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "created nothing",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//list of blog
const listOfBlog = async (req, res) => {
  try {
    const viewList = await blog.find();
    return res.status(200).json({
      success: true,
      message: viewList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// like and dislike on blog API
const likeAndDislike = async (req, res) => {
  const { blogId, blogLike } = req.params
  try {
    const myBlogLike = await blog.findById(blogId).select('blogLike')
    if (blogLike === 'true') {
      let likes = myBlogLike.bloglike
      likes++
      await blog.findOneAndUpdate(myBlogLike._id, { $set: { blogLikes: likes } }, { new: true })
      res.status(200).json({
        success: true,
        message: "liked successfully"
      })
    } else {
      let likes = myBlogLike.bloglike
      likes--
      await blog.findOneAndUpdate(myBlogLike._id, { $set: { blogLikes: likes } }, { new: true })
      res.status(200).json({
        success: true,
        message: "Disliked successfully"
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}

//remove blog
const removeBlogApi = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blogToRemove = await blog.findByIdAndDelete(blogId);
    if (blogToRemove) {
      return res.status(200).json({
        success: true,
        message: "Data deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "ID not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// update comment
const updateBlogApi = async (req, res) => {
  const { blogId } = req.params;
  try {
    const ifUpdateData = await blog.findByIdAndUpdate(blogId, req.body);
    if (ifUpdateData) {
      await ifUpdateData.save();
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        ifUpdateData: ifUpdateData,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Id not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  addBlog,
  listOfBlog,
  removeBlogApi,
  updateBlogApi,
  likeAndDislike
};
