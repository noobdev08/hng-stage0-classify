import express from 'express';
import { getResponse } from '../controllers/processController.js';

const router = express.Router();

router.get('/', getResponse);

export default router;