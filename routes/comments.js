import express from 'express';
// const { getCommentsHandler, getSingleCommentHandler, postCommentsHandler, deleteSingleCommentHandler } = require('../controllers/comments')
import { getCommentsHandler } from'../controllers/CommentsController.js'
// const router = express.Router()


const router = express.Router();

router.get('/', getCommentsHandler)
// router.post('/', postCommentsHandler)
// router.get('/:commentId', getSingleCommentHandler)
// router.delete('/:commentId', deleteSingleCommentHandler)


export default router;
