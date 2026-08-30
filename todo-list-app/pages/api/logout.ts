// pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';

interface LogoutResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.setHeader('Set-Cookie', cookie.stringifySetCookie({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  }));

  res.status(200).json({ message: 'Logout successful' });
}
