import express from 'express';
import verifyToken from '../middlewares/verifyToken.js'; 
const router = express.Router();

router.get('/', verifyToken);

export default router

