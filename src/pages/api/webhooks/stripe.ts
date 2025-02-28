import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    if (!webhookSecret) {
      throw new Error('Stripe webhook secret is not defined');
    }
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    const errorMessage = `Webhook Error: ${err.message}`;
    console.error(errorMessage);
    return res.status(400).send(errorMessage);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;
      // Save the subscription info to your database
      await handleSubscriptionCreated(checkoutSession);
      break;
    case 'invoice.paid':
      const invoice = event.data.object;
      // Update the subscription status in your database
      await handleInvoicePaid(invoice);
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      // Handle subscription cancellation
      await handleSubscriptionCancelled(subscription);
      break;
    default:
      // Avoid console.log in production
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Unhandled event type: ${event.type}`);
      }
  }

  res.status(200).json({ received: true });
}

async function handleSubscriptionCreated(session: any) {
  const { userId, planId } = session.metadata || {};
  
  // Here you would update your database with the user's subscription info
  if (process.env.NODE_ENV !== 'production') {
    console.log(`User ${userId} subscribed to ${planId} plan`);
  }
}

async function handleInvoicePaid(invoice: any) {
  // Update subscription status in your database
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Invoice ${invoice.id} was paid`);
  }
}

async function handleSubscriptionCancelled(subscription: any) {
  // Update subscription status in your database
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Subscription ${subscription.id} was cancelled`);
  }
}
