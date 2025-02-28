export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired';
  priceId: string;
  quantity: number;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  endedAt?: Date | null;
  canceledAt?: Date | null;
  trialStart?: Date | null;
  trialEnd?: Date | null;
}

export interface Price {
  id: string;
  productId: string;
  active: boolean;
  description: string | null;
  unitAmount: number | null;
  currency: string;
  type: 'one_time' | 'recurring';
  interval?: 'day' | 'week' | 'month' | 'year';
  intervalCount?: number;
  trialPeriodDays?: number | null;
  metadata?: Record<string, string>;
}

export interface Product {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  image: string | null;
  metadata?: Record<string, string>;
  prices?: Price[];
}
