import {
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from '../controller/GoalController';
import authMiddleware from '../middleware/AuthMiddleware';
import { Router } from 'express';

const router = Router();
router.use(authMiddleware); // Apply authentication middleware to all routes
router.post('/', createGoal);
router.get('/', getGoal);
router.patch('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
