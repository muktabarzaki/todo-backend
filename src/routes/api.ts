import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { getTodos, createTodo } from '../controllers/todoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// AUTHENTICATION ROUTES
router.post('/auth/register', register);
router.post('/auth/login', login);

// TODO ROUTES (Protected)
router.get('/todos', verifyToken, getTodos);
router.post('/todos', verifyToken, createTodo);

export default router;