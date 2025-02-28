'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
  priceId?: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Free',
    description: 'Perfect for trying out our platform',
    price: 0,
    interval: 'month',
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Limited integrations', included: true },
      { text: 'Community support', included: true },
      { text: 'Advanced security', included: false },
      { text: 'Custom domains', included: false },
    ],
    buttonText: 'Get Started',
  },
  {
    name: 'Pro',
    description: 'For professionals and small teams',
    price: 19,
    interval: 'month',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'All integrations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced security', included: true },
      { text: 'Custom domains', included: false },
    ],
    buttonText: 'Subscribe Now',
    popular: true,
    priceId: 'price_pro_monthly',
  },
  {
    name: 'Enterprise',
    description: 'For large organizations and teams',
    price: 99,
    interval: 'month',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'All integrations', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Advanced security', included: true },
      { text: 'Custom domains', included: true },
    ],
    buttonText: 'Contact Sales',
    priceId: 'price_enterprise_monthly',
  },
];

interface PricingCardsProps {
  showCurrentPlan?: boolean;
}

export function PricingCards({ showCurrentPlan = false }: PricingCardsProps) {
  const handleSubscribe = async (priceId?: string) => {
    if (!priceId) return;
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: priceId,
        }),
      });
      
      const session = await response.json();
      if (session.error) {
        console.error('Error creating checkout session:', session.error);
        return;
      }
      
      // Redirect to Stripe checkout
      window.location.href = `https://checkout.stripe.com/pay/${session.sessionId}`;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <Card 
          key={plan.name} 
          className={`border ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'} rounded-xl shadow-lg`}
        >
          {plan.popular && (
            <div className="bg-blue-500 text-white text-center py-1 px-4 rounded-t-xl font-medium text-sm">
              Most Popular
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold">${plan.price}</span>
              <span className="ml-1 text-gray-600">/{plan.interval}</span>
            </div>
            
            <ul className="mt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className={`flex-shrink-0 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>
                    {feature.included ? (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span className={`ml-3 ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Button 
                onClick={() => handleSubscribe(plan.priceId)}
                className={`w-full ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
