import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index';

const config = require('../config/config');

const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await db.user.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export default async function (req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      console.log('Authentication failed for:', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });

    const data = { email, token };
    res.status(200).json({ data: [data], statusCode: 200, taskStatus: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ statusCode: 500, taskStatus: false });
  }
}
