import { Request, Response, response } from 'express';
import { openai } from '../server';

const dialogueController = {
    request: async (req: Request, res: Response) => {
        return res.status(500).send("POST 명령어를 사용해 주세요.");
    },
    response: async (req: Request, res: Response) => {
        const audio = ;
        const response = openai.audio.transcriptions.create("whisper-1", audio);
    },
};

export default dialogueController;