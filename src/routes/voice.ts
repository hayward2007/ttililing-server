import express from 'express';
import voiceController from '../controllers/voiceController';
const router = express.Router();
router.get('/', voiceController.response);
/*
{
    "request" : "message to GPT-4"
}
*/
router.post('/', voiceController.request);
export default router;