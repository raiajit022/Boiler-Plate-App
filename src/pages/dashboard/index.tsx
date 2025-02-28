import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/dashboard/Layout';
import { DashboardStats } from '@/components/dashboard/Stats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useSubscription } from '@/hooks/useSubscription';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import React from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { subscription, isLoading, error } = useSubscription();

  // Add useEffect for handling redirects
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin').catch((error) => {
        console.error('Failed to redirect:', error);
      });
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner aria-label="Loading dashboard" />
        </div>
      </DashboardLayout>
    );
  }

  // Replace direct router push with loading state
  if (!session) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner aria-label="Checking authentication" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-600 p-4" role="alert">
          Error loading subscription data: {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DashboardStats />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <QuickActions subscription={subscription} />
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  );
}
