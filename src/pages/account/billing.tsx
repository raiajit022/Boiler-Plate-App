import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BillingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { success, canceled } = router.query;

  const handleSubscribe = async (planId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Subscription successful!
        </div>
      )}
      {canceled && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Subscription canceled.
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-6">
          <h2 className="text-xl font-semibold">Basic Plan</h2>
          <button
            onClick={() => handleSubscribe('basic')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Subscribe to Basic
          </button>
        </div>
        <div className="border rounded p-6">
          <h2 className="text-xl font-semibold">Pro Plan</h2>
          <button
            onClick={() => handleSubscribe('pro')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Subscribe to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
