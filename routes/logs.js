import express from 'express';
import { createLog, getLogs } from '../controllers/LogsController.js';

const router = express.Router();

router.get('/', getLogs);
router.post('/action', createLog);

export default router;