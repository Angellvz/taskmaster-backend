// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export const TaskController = {
  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).userId; // set por middleware auth
      const task = await TaskService.createTask({ ...req.body, user_id: userId, completed: false });
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const tasks = await TaskService.getTasksForUser(userId);
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await TaskService.updateTask(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await TaskService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
