import { generateToken } from './auth';
import pool from './db';
import { verifyFirebaseIdToken } from './firebaseToken';
import mysql from 'mysql2/promise';

interface UserRow {
  id: number;
  username: string;
  email: string;
}

export async function createAppSessionFromFirebaseIdToken(idToken: string, username?: string) {
  const payload = await verifyFirebaseIdToken(idToken);
  const email = typeof payload.email === 'string' ? payload.email : null;
  const firebaseUid = typeof payload.sub === 'string' ? payload.sub : null;

  if (!email || !firebaseUid) {
    throw new Error('Firebase token is missing required claims');
  }

  const [rows] = await pool.query<mysql.RowDataPacket[]>(
    'SELECT id, username, email FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  let user = rows[0] as UserRow | undefined;
  if (!user) {
    const baseUsername = username?.trim() || email.split('@')[0];
    const candidates = [
      baseUsername,
      `${baseUsername}_${firebaseUid.slice(0, 6)}`,
      `${baseUsername}_${Date.now().toString().slice(-6)}`,
    ];

    let lastError: unknown = null;
    for (const candidate of candidates) {
      try {
        const [result] = await pool.query<mysql.ResultSetHeader>(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [candidate, email, firebaseUid]
        );
        user = { id: result.insertId, username: candidate, email };
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!user) {
      throw lastError instanceof Error ? lastError : new Error('Failed to create local user record');
    }
  }

  const token = generateToken(user.id, user.username);
  const cookieParts = [
    `token=${encodeURIComponent(token)}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    `Max-Age=${60 * 60 * 24 * 7}`,
  ];

  if (process.env.NODE_ENV === 'production') {
    cookieParts.push('Secure');
  }

  const setCookie = cookieParts.join('; ');

  return { user, setCookie };
}
