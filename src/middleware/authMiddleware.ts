import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    console.log('No Authorization header provided');
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    console.log('No token after Bearer');
    return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}
