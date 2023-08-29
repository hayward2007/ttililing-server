import express from 'express';
import apiController from '../controllers/gptController';

const router = express.Router();

router.get('/endpoint', apiController.getEndpoint);

export default router;