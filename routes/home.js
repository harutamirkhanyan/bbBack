import express from 'express';
import { getHomeData, changeHomeData, addHomeData, deleteHomeData } from '../controllers/HomeController.js';
const router = express.Router();

router.get('/', getHomeData);
router.put('/', changeHomeData);
router.post('/', addHomeData);
router.delete('/', deleteHomeData);

export default router;
