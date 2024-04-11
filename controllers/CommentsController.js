
const getCommentsHandler = (req, res) => {
  res.send('Get comments route')
}

// const getSingleCommentHandler = (req, res) => {
//   console.log(req.params)
//   console.log(req.params, 'req.params')
//   res.send(`Get comment route Comment Id ${req.params.commentId}`)
// }

// const postCommentsHandler = (req, res) => {
//   res.send('Post comments route')
// }

// const deleteSingleCommentHandler = (req, res) => {
//   console.log(req.params)
//   res.send(`Delete comment route comment Id ${req.params.commentId}`)
// }


module.exports = {
  getCommentsHandler,
  // getSingleCommentHandler,
  // postCommentsHandler,
  // deleteSingleCommentHandler
}