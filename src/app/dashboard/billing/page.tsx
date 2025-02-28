'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PricingCards } from '@/components/pricing-cards';

export default function BillingPage() {
  const [status, setStatus] = useState<'success' | 'canceled' | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success')) {
      setStatus('success');
    } else if (searchParams.get('canceled')) {
      setStatus('canceled');
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Billing</h1>
      
      {status === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Payment successful! Thank you for your subscription.
        </div>
      )}
      
      {status === 'canceled' && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          Payment canceled. If you need help, please contact support.
        </div>
      )}
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Your Current Plan</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-medium">Free Plan</p>
          <p className="text-gray-600 mt-2">You are currently on the free plan.</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Upgrade Your Plan</h2>
        <PricingCards showCurrentPlan={true} />
      </div>
    </div>
  );
}
