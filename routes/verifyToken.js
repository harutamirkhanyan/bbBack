const express = require('express');
const { verifyToken } = require('../controllers/VerifyToken.js');
const router = express.Router();

router.get('/', verifyToken);

module.exports = router;
