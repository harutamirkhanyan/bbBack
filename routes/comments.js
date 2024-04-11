const express = require('express')
// const { getCommentsHandler, getSingleCommentHandler, postCommentsHandler, deleteSingleCommentHandler } = require('../controllers/comments')
const { getCommentsHandler } = require('../controllers/CommentsController')
const router = express.Router()


router.get('/', getCommentsHandler)
// router.post('/', postCommentsHandler)
// router.get('/:commentId', getSingleCommentHandler)
// router.delete('/:commentId', deleteSingleCommentHandler)


module.exports = router