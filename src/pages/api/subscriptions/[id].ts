import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/mongodb';
import { SubscriptionModel } from '@/models/subscription';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { db } = await connectToDatabase();

  try {
    switch (req.method) {
      case 'GET':
        const subscription = await SubscriptionModel.findById(id);
        if (!subscription) {
          return res.status(404).json({ error: 'Subscription not found' });
        }
        return res.status(200).json(subscription);

      case 'PUT':
        const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        return res.status(200).json(updatedSubscription);

      case 'DELETE':
        await SubscriptionModel.findByIdAndDelete(id);
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Subscription API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
