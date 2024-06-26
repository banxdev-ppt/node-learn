import { Request, Response } from 'express';
import { IUser } from '../types/global.type';
import bcrypt from 'bcrypt';

const mockUser = {
  email: 'bank.pptsrm@gmail.com',
  password: '$2b$10$Z2NybITD3M5tPnQ5hbIHlOoBN5.qLejSjru80W9CGYm63YmFXtQQK',
};

export default async function loginAuth(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ statusCode: 400, taskStatus: false, alertMessage: 'email & password required' });
  }

  try {
    // query email from database
    if (email !== mockUser.email) {
      return res.status(404).json({ statusCode: 404, taskStatus: false, alertMessage: 'user not found' });
    }

    const checkedPass = await bcrypt.compare(password, mockUser.password);

    if (!checkedPass) {
      return res.status(401).json({ statusCode: 401, taskStatus: false, alertMessage: 'invalid password' });
    }

    res.status(200).json({ statusCode: 200, taskStatus: true, alertMessage: 'logged in', user: { email: mockUser.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ statusCode: 500, taskStatus: false, alertMessage: 'server error' });
  }
}
