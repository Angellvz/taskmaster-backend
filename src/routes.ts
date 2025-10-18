// src/routes.ts
import { Router } from 'express';
import { TaskController } from './controllers/taskController';
import { authMiddleware } from './middlewares/authMiddleware';
import { AuthController } from './controllers/authController';

const router = Router();

// autenticación pública
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// rutas protegidas
router.post('/tasks', authMiddleware, TaskController.create);
router.get('/tasks', authMiddleware, TaskController.list);
router.put('/tasks/:id', authMiddleware, TaskController.update);
router.delete('/tasks/:id', authMiddleware, TaskController.remove);

export default router;
