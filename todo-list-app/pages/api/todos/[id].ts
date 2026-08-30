import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';
import { Todo, UpdateTodoInput, ApiError, JwtPayload } from '../../../types';

interface TodoResponse {
  message?: string;
  todo?: Todo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoResponse | ApiError>
) {
  const { id } = req.query as { id: string };
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = (await verifyToken(token)) as JwtPayload;
    const userId = decoded.userId;

    const [todos] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM todos WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (todos.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.method === 'PUT') {
      const { title, description, completed } = req.body as UpdateTodoInput;

      await pool.query<mysql.ResultSetHeader>(
        `UPDATE todos 
         SET title = COALESCE(?, title), 
             description = COALESCE(?, description), 
             completed = COALESCE(?, completed)
         WHERE id = ? AND user_id = ?`,
        [title, description, completed, id, userId]
      );

      const [updatedTodo] = await pool.query<mysql.RowDataPacket[]>(
        'SELECT * FROM todos WHERE id = ?',
        [id]
      );

      return res.status(200).json({ todo: updatedTodo[0] as Todo });
    }

    if (req.method === 'DELETE') {
      await pool.query<mysql.ResultSetHeader>(
        'DELETE FROM todos WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      return res.status(200).json({ message: 'Todo deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Todo API error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
