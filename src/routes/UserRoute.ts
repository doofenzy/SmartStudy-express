import { Router } from 'express';
import { signup, login } from '../controller/UserController';
import {
  loginValidator,
  signupValidator,
} from '../middleware/LoginSignupValidationMiddleware';
import handleValidationErrors from '../middleware/HandleValidationMiddleware';

const router = Router();

router.post('/signup', signupValidator, handleValidationErrors, signup);
router.post('/login', loginValidator, handleValidationErrors, login);

export default router;
