// src/db/index.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Factory para la conexión a Postgres (Pool)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params)
};
