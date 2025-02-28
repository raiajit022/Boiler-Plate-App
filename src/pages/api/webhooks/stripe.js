import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}

async function handleSubscriptionCreated(session) {
  const { userId, planId } = session.metadata;
  
  // Here you would update your database with the user's subscription info
  console.log(`User ${userId} subscribed to ${planId} plan`);
}

async function handleInvoicePaid(invoice) {
  // Update subscription status in your database
  console.log(`Invoice ${invoice.id} was paid`);
}

async function handleSubscriptionCancelled(subscription) {
  // Update subscription status in your database
  console.log(`Subscription ${subscription.id} was cancelled`);
}
