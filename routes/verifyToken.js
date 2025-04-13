import express from 'express';
import { verifyToken } from '../controllers/VerifyToken.js';
const router = express.Router();

router.get('/', verifyToken);

export default router
