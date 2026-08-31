// pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';

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

  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);

  res.status(200).json({ message: 'Logout successful' });
}
