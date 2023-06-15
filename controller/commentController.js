const comment = require("../model/commentSchema");
const { findByIdAndUpdate } = require("../model/userSchema");

//create Comment
const addCommentApi = async (req, res) => {
  try {
    const commentData = new comment(req.body);
    if (commentData != "") {
      await commentData.save();
      return res.status(409).json({
        success: true,
        message:"Comment added successfully",
        commentData: commentData,
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Comment not added sucessfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//view all comment
const viewCommentApi = async (req, res) => {
  try {
    const viewAllComment = await comment.find();
    return res.status(200).json({
      success: true,
      message: viewAllComment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// update comment
const updateCommentApi = async (req, res) => {
  const { commentId } = req.params;
  try {
    const updateData = await comment.findByIdAndUpdate(commentId, req.body);
    if (updateData) {
      await updateData.save();
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        updateData: updateData
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

//remove Comment
const removeCommentApi = async (req, res) => {
  const { commentId } = req.params;
  try {
    const commentToRemove = await comment.findByIdAndDelete(commentId);
    if (commentToRemove) {
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

module.exports = {
  addCommentApi,
  viewCommentApi,
  removeCommentApi,
  updateCommentApi,
};
