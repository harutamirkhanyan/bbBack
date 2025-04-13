import { requestPasswordReset, resetPassword } from '../controllers/authController.js'; // ✅

import express from 'express';
const router = express.Router();


router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);


export default router;

