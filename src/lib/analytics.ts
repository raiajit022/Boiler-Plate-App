import { Analytics } from '@segment/analytics-node';
import mixpanel from 'mixpanel-browser';

// Initialize Segment
const analytics = new Analytics({
  writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!,
});

// Initialize Mixpanel
if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  // Track in Segment
  analytics.track({
    event,
    properties,
  });

  // Track in Mixpanel
  if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel.track(event, properties);
  }
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  // Identify in Segment
  analytics.identify({
    userId,
    traits,
  });

  // Identify in Mixpanel
  if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
    if (traits) {
      mixpanel.people.set(traits);
    }
  }
};
