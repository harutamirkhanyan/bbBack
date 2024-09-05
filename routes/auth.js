const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/request-password-reset', auth.requestPasswordReset);
router.post('/reset-password', auth.resetPassword);

module.exports = router;
