import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import { Op } from 'sequelize';
const config = require('../config/config');

export default async function registerAuth(req: Request, res: Response) {
  const { username, password, email, address } = req.body;

  if (!username || !password || !email || !address) {
    return res.status(400).json({ statusCode: 400, taskStatus: false, message: 'Missing required fields' });
  }

  const t = await db.sequelize.transaction();

  try {
    const existingUser = await db.user.findOne({ where: { [Op.or]: [{ username }, { email }] } });

    if (existingUser) {
      await t.rollback();
      return res.status(400).json({ statusCode: 400, taskStatus: false, message: existingUser.username === username ? 'Username already exists' : 'Email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (!hashPassword) {
      await t.rollback();
      return res.status(500).json({ statusCode: 500, taskStatus: false, message: 'Error hashing password' });
    }

    const token = jwt.sign({ email: email }, config.SECRET_KEY, { expiresIn: '1h' });
    const newUser = await db.user.create({ username, password: hashPassword, email, address }, { transaction: t });
    await t.commit();

    res.status(201).json({ data: [{ ...newUser.dataValues, token }], statusCode: 200, taskStatus: true });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ statusCode: 500, taskStatus: false, message: 'Internal server error' });
  }
}
