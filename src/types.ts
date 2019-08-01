export interface AnalyticsHelpers {
  init: (trackingCode?: string) => void;
  pageview: () => void;
  event: (category?: string, action?: string) => void;
  exception: (description?: string, fatal?: boolean) => void;
  ga: (...args: any[]) => any;
}

export interface WithAnalyticsConfig {
  trackingCode?: string;
  respectDNT?: boolean;
  anonymizeIp?: boolean;
}
