// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';
import mysql from 'mysql2/promise';
import pool from '../../lib/db';
import { comparePassword, generateToken } from '../../lib/auth';
import { validateLoginData } from '../../lib/validation';
import { LoginCredentials, AuthResponse, ApiError, User } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body as LoginCredentials;

    // Validate input
    const validationErrors = validateLoginData({ username, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: validationErrors.map(e => e.message).join(', ') 
      });
    }

    // Find user
    const [users] = await pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0] as User;
    const isValidPassword = await comparePassword(password, user.password!);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id, user.username);

    // Set cookie
    res.setHeader('Set-Cookie', cookie.stringifySetCookie({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    }));

    // Remove password from response
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.status(200).json({ 
      message: 'Login successful',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
}
