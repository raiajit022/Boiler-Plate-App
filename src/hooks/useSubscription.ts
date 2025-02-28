import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { Subscription } from '@/types/subscription';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSubscription() {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR<Subscription>(
    session ? `/api/subscriptions/${session.user.id}` : null,
    fetcher
  );

  return {
    subscription: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useSubscriptions(status?: string) {
  const { data, error, mutate } = useSWR<Subscription[]>(
    `/api/subscriptions${status ? `?status=${status}` : ''}`,
    fetcher
  );

  return {
    subscriptions: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
