import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return mock data for local development
  return res.status(200).json({
    sessionId: 'mock_session_id',
    success: true,
    message: 'This is a mock checkout session for local development'
  });
} 