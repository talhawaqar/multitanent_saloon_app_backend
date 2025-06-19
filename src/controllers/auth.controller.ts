import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body;
  try {
    console.log('I am in')
    const token = await AuthService.register(username, email, password, name);
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  try {
    const token = await AuthService.login(username, password);
    res.json({ token });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};
