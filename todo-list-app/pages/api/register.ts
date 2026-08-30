// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import pool from '../../lib/db';
import { hashPassword } from '../../lib/auth';
import { validateRegisterData } from '../../lib/validation';
import { RegisterData, AuthResponse, ApiError } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, email, password } = req.body as RegisterData;

    // Validate input
    const validationErrors = validateRegisterData({ username, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: validationErrors.map(e => e.message).join(', ') 
      });
    }

    // Check if user exists
    const [existingUsers] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const [result] = await pool.query<mysql.ResultSetHeader>(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'User created successfully',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
}
