import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SubscriptionButton from '../../components/SubscriptionButton';

export default function BillingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    } else if (session) {
      fetchSubscriptionData();
    }
  }, [session, status, router]);

  const fetchSubscriptionData = async () => {
    try {
      // Here you would fetch the user's subscription data from your API
      // For now, we'll use mock data
      setSubscription({
        status: 'active',
        plan: 'basic',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Subscription Management</h1>
      
      {router.query.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Subscription updated successfully! Your new plan is now active.
        </div>
      )}
      
      {router.query.canceled && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Subscription update canceled. Your current plan remains unchanged.
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        {subscription ? (
          <>
            <div className="mb-4">
              <p>
                <span className="font-medium">Plan:</span>{' '}
                {subscription.plan === 'basic' ? 'Basic Plan' : 'Pro Plan'}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className={subscription.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                  {subscription.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </p>
              <p>
                <span className="font-medium">Next billing date:</span>{' '}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          </>
        ) : (
          <p>No active subscription</p>
        )}
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <h3 className="text-lg font-medium">Basic Plan</h3>
            <p className="text-gray-600 mb-4">$9.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Basic features</li>
              <li>Limited usage</li>
              <li>Email support</li>
            </ul>
            <SubscriptionButton planId="basic" buttonText={subscription?.plan === 'basic' ? 'Current Plan' : 'Select Plan'} />
          </div>
          
          <div className="border rounded p-4">
            <h3 className="text-lg font-medium">Pro Plan</h3>
            <p className="text-gray-600 mb-4">$29.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>All basic features</li>
              <li>Unlimited usage</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
            <SubscriptionButton planId="pro" buttonText={subscription?.plan === 'pro' ? 'Current Plan' : 'Select Plan'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  
  return {
    props: { session }
  };
}
