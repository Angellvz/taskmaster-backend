// src/services/taskService.ts
import { Task } from '../models/task';
import { TaskRepository } from '../repositories/taskRepository';

export const TaskService = {
  async createTask(task: Task) {
    // validaciones de negocio aquí
    if (!task.title) throw new Error('Title is required');
    return TaskRepository.create(task);
  },

  async getTasksForUser(user_id: number) {
    return TaskRepository.findByUser(user_id);
  },

  async updateTask(id: number, fields: Partial<Task>) {
    return TaskRepository.update(id, fields);
  },

  async deleteTask(id: number) {
    return TaskRepository.delete(id);
  }
};
