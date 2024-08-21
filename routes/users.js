const express = require('express');
const { getSingleUserHandler, addUsersHandler, editUser, getAllUserList, blockUsers,unblockUsers, deleteUser, changeUserRole} = require('../controllers/UsersController');
const router = express.Router();
// const adminOnly = require('../middlewares/adminOnly');

router.get('/user', getSingleUserHandler);
router.get('/usersList', getAllUserList)
router.post('/', addUsersHandler);
router.post('/edit', editUser);
router.post('/block', blockUsers);
router.post('/unblock', unblockUsers);
router.delete('/delete', deleteUser);
router.post('/role', changeUserRole);



module.exports = router;
