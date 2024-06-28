const express = require('express');
const { getSingleUserHandler, addUsersHandler, editUser } = require('../controllers/UsersController');
const router = express.Router();

router.get('/', getSingleUserHandler);
router.post('/', addUsersHandler);
router.post('/edit', editUser);

module.exports = router;
