import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getUsers, getUserById } from '../controller/userController';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);

module.exports = router;
