import express from 'express';
import dialogueController from '../controllers/dialogueController';
const router = express.Router();
router.get('/', dialogueController.response);
/*
{
    "request" : "message to GPT-4"
}
*/
router.post('/', dialogueController.request);
export default router;