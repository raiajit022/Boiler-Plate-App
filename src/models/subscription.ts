import { Schema, model, models } from 'mongoose';

const subscriptionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ['free', 'pro', 'enterprise'],
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'canceled', 'past_due'],
  },
  currentPeriodEnd: {
    type: Date,
    required: true,
  },
  stripeCustomerId: String,
  stripePriceId: String,
  stripeSubscriptionId: String,
}, {
  timestamps: true,
});

export const SubscriptionModel = models.Subscription || model('Subscription', subscriptionSchema);
