import { Request, Response } from 'express';
import { generateResponse } from '../services/openai.service';

export const chatController = {
  sendMessage: async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message cannot be empty' });
        return;
      }

      const response = await generateResponse(message);

      res.json({ response });
    } catch (error: any) {
      console.error('OpenAI Error:', error);
      
      if (error.status === 429) {
        res.status(429).json({ error: 'Request limit exceeded. Try again later.' });
        return;
      }

      res.status(500).json({ 
        error: 'Error contacting neural network. Try again later.' 
      });
    }
  },
};