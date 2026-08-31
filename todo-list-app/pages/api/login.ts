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
    const { idToken } = req.body as { idToken?: string };
    if (!idToken) {
      return res.status(400).json({ message: 'Missing Firebase ID token' });
    }

    const { user, setCookie } = await createAppSessionFromFirebaseIdToken(idToken);
    res.setHeader('Set-Cookie', setCookie);

    res.status(200).json({ 
      message: 'Login successful',
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
}
