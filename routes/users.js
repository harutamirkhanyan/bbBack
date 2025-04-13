import express from 'express';
import { getSingleUserHandler, addUsersHandler, editUser, getAllUserList, blockUsers, unblockUsers, deleteUser, changeUserRole } from '../controllers/UsersController.js';
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



export default router
