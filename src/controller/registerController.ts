import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUsers } from '../types/global.type';
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const user = [{ id: 1, username: 'banxdev', password: '152544', email: 'bank.pptsrm@gmail.com', address: '1414/5 R.jompol cha-am cha-am 76120' }];

export default async function registerAuth(req: Request, res: Response) {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ statusCode: 400, taskStatus: false });
  }

  user.forEach((user) => {
    if (user.username === username) {
      return res.status(400).json({ statusCode: 400, taskStatus: false, message: 'already has username' });
    } else if (user.email === email) {
      return res.status(400).json({ statusCode: 400, taskStatus: false, message: 'already has email' });
    }
  });

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      res.status(404).send('hash password error');
    }
    const token = jwt.sign({ email: email }, config.SECRET_KEY, { expiresIn: '1h' });
    const data: IUsers[] = [{ username, password: hashPassword, email, address }];
    //store to database
    res.status(201).json({ data: { ...data, token }, statusCode: 200, taskStatus: true });
  } catch (error) {
    console.log(error);
  }
}
