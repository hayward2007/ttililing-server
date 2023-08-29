// src/controllers/apiController.ts
import { Request, Response } from 'express';

const gptController = {
  getEndpoint: (req: Request, res: Response) => {
    res.json({ message: 'Hello, world!' });
  },
};

export default gptController;