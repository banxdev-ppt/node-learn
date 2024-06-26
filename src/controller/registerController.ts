import { Request, Response } from 'express';
import { IUsers } from '../types/global.type';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const config = require('../config/config');

export default async function registerAuth(req: Request, res: Response) {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ statusCode: 400, taskStatus: false });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      res.status(404).send('hash password error');
    }
    const token = jwt.sign({ email: email }, config.SECRET_KEY, { expiresIn: '1h' });
    const data = [{ username, password: hashPassword, email, address, token }];
    //store to database
    res.status(201).json({ data: data, statusCode: 200, taskStatus: true });
  } catch (error) {
    console.log(error);
  }
}
