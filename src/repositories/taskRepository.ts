// src/repositories/taskRepository.ts
import db from '../db';
import { Task } from '../models/task';

export const TaskRepository = {
  async create(task: Task) {
    const result = await db.query(
      `INSERT INTO tasks (title, description, completed, user_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [task.title, task.description || null, task.completed, task.user_id]
    );
    return result.rows[0];
  },

  async findByUser(user_id: number) {
    const result = await db.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    return result.rows;
  },

  async update(id: number, fields: Partial<Task>) {
    // ejemplo simple — en producción usa SQL dinámico o query builder
    const result = await db.query(
      `UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *`,
      [fields.title, fields.description, fields.completed, id]
    );
    return result.rows[0];
  },

  async delete(id: number) {
    await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
    return true;
  }
};
