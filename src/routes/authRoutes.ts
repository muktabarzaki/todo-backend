import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/register - Daftarkan user baru
router.post('/register', register);

// POST /api/auth/login - Login dan dapatkan token
router.post('/login', login);

export default router;