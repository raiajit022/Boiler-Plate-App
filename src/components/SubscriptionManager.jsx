import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

export default function SubscriptionManager() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubscribe = async (planId) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });
      
      const { sessionId } = await response.json();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="subscription-container">
      <h2>Subscription Plans</h2>
      
      <div className="plans-grid">
        <div className="plan-card">
          <h3>Basic Plan</h3>
          <p className="price">$9.99/month</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button 
            onClick={() => handleSubscribe('basic')}
            disabled={isLoading || session?.user?.plan === 'basic'}
          >
            {session?.user?.plan === 'basic' ? 'Current Plan' : 'Subscribe'}
          </button>
        </div>
        
        <div className="plan-card featured">
          <h3>Pro Plan</h3>
          <p className="price">$19.99/month</p>
          <ul>
            <li>All Basic Features</li>
            <li>Feature 4</li>
            <li>Feature 5</li>
            <li>Feature 6</li>
          </ul>
          <button 
            onClick={() => handleSubscribe('pro')}
            disabled={isLoading || session?.user?.plan === 'pro'}
          >
            {session?.user?.plan === 'pro' ? 'Current Plan' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  );
}
