import type { NextApiRequest, NextApiResponse } from 'next';
import { createAppSessionFromFirebaseIdToken } from '../../lib/session';
import { AuthResponse, ApiError } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { idToken, username } = req.body as { idToken?: string; username?: string };
    if (!idToken) {
      return res.status(400).json({ message: 'Missing Firebase ID token' });
    }

    const { user, setCookie } = await createAppSessionFromFirebaseIdToken(idToken, username);
    res.setHeader('Set-Cookie', setCookie);

    res.status(201).json({ 
      message: 'User created successfully',
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
}
