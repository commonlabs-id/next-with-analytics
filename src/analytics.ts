import { WithAnalyticsConfig, AnalyticsHelpers } from './types';

import * as debugAnalytics from './helpers/debug';
import * as prodAnalytics from './helpers/prod';

const isLocalhost =
  typeof window !== 'undefined' &&
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
  );

const isDev = process.env.NODE_ENV !== 'production';

const isDntEnabled =
  // Do not add Google Analytics when building the static site...
  typeof window === 'undefined' ||
  // ...or when DoNotTrack is enabled:
  (typeof window.navigator !== 'undefined' && window.navigator.doNotTrack === '1');

export interface AnalyticsInstance {
  analytics?: AnalyticsHelpers;
  handleRouteChange: () => void;
}

/**
 * Create an analytics instance with any options passed into it.
 *
 * @param config Optional configurations.
 */
export default function initAnalytics(config: WithAnalyticsConfig = {}): AnalyticsInstance {
  let analytics: AnalyticsHelpers | undefined;

  if (isDev || isLocalhost) {
    analytics = debugAnalytics;
  }

  if (!isDntEnabled || !config.respectDNT) {
    // Only load analytics if we're sure DNT is not enabled AND respectDNT is enabled
    analytics = prodAnalytics;
  }

  if (analytics) {
    // init analytics
    analytics.init(config.trackingCode);
    // log page for first view
    analytics.pageview();

    if (config.anonymizeIp) {
      analytics.ga('set', 'anonymizeIp', true);
    }
  }

  const handleRouteChange = () => {
    if (analytics) {
      // log page
      analytics.pageview();
    }
  };

  return { analytics, handleRouteChange };
}
