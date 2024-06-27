import { Request, Response } from 'express';
import db from '../models/index';

export async function getUsers(res: Response) {
  try {
    const users = await db.user.findAll();
    return res.status(200).json({ data: users, statusCode: 200, taskStatus: true });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error', statusCode: 500, taskStatus: false });
  }
}

export async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;
  try {
    const user = await db.user.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found', statusCode: 404, taskStatus: false });
    }

    return res.status(200).json({ data: user, statusCode: 200, taskStatus: true });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error', statusCode: 500, taskStatus: false });
  }
}
