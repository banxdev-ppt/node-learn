import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { getUsers, getUserById } from '../controller/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

module.exports = router;
