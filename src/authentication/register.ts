import { Request, Response } from 'express';
import { IUsers } from '../types/global.type';
import bcrypt from 'bcrypt';

export default async function registerAuth(req: Request, res: Response) {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ statusCode: 400, taskStatus: false, alertMessage: 'Missing required fields' });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      res.status(404).send('hash password error');
    }
    const users: IUsers[] = [{ username, password: hashPassword, email, address }];
    //store to database
    res.status(201).json({ data: users, statusCode: 200, taskStatus: true, alertMessage: 'registered' });
  } catch (error) {
    console.log(error);
  }
}
