const express = require('express')
const router = express.Router()
const comment = require("../controller/commentController")

router.post('/addcomment', comment.addCommentApi)
router.get('/viecomment', comment.viewCommentApi)
router.patch('/updateComment/:commentId', comment.updateCommentApi)
router.delete('/deletecomment/:commentId', comment.removeCommentApi)

module.exports = router;  
