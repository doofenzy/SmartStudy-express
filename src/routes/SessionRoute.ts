import { Router } from 'express';
import {
  createSession,
  deleteSession,
  getSession,
} from '../controller/SessionController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = Router();

router.post('/', authMiddleware, createSession);
router.delete('/:id', authMiddleware, deleteSession);
router.get('/', authMiddleware, getSession);

export default router;
