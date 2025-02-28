import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "Your SaaS App",
    version: "0.1.0",
  },
});

export async function createCheckoutSession({
  priceId,
  userId,
  returnUrl,
}: {
  priceId: string;
  userId: string;
  returnUrl: string;
}) {
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: undefined, // Will be populated by customer ID
    client_reference_id: userId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: returnUrl,
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  return { checkoutUrl: checkoutSession.url };
}

export async function manageSubscription({
  userId,
  returnUrl,
}: {
  userId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: userId, // Assuming userId is the Stripe customer ID
    return_url: returnUrl,
  });

  return { billingPortalUrl: session.url };
}
