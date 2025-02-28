import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/dashboard/Layout';
import { DashboardStats } from '@/components/dashboard/Stats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useSubscription } from '@/hooks/useSubscription';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { subscription, isLoading } = useSubscription();

  if (status === 'loading' || isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardStats />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions subscription={subscription} />
      </div>
    </DashboardLayout>
  );
}
