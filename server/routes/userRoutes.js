import express from 'express';
import { registerUser, loginUser, getUserProfile,getRegisterUser } from '../controllers/UserController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/register', getRegisterUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', authenticate, getUserProfile);

export default router;
