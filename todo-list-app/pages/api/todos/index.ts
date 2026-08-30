import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';
import { validateTodoInput } from '../../../lib/validation';
import { Todo, CreateTodoInput, ApiError, JwtPayload } from '../../../types';

interface TodoResponse {
  message?: string;
  todos?: Todo[];
  todo?: Todo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse | ApiError>
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = (await verifyToken(token)) as JwtPayload;
    const userId = decoded.userId;

    if (req.method === 'GET') {
      const [todos] = await pool.query<mysql.RowDataPacket[]>(
        'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );

      return res.status(200).json({ todos: todos as Todo[] });
    }

    if (req.method === 'POST') {
      const { title, description } = req.body as CreateTodoInput;

      const validationErrors = validateTodoInput({ title, description });
      if (validationErrors.length > 0) {
        return res.status(400).json({
          message: validationErrors.map((e) => e.message).join(', '),
        });
      }

      const [result] = await pool.query<mysql.ResultSetHeader>(
        'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
        [userId, title, description || null]
      );

      const [newTodo] = await pool.query<mysql.RowDataPacket[]>(
        'SELECT * FROM todos WHERE id = ?',
        [result.insertId]
      );

      return res.status(201).json({ todo: newTodo[0] as Todo });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Todo API error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
