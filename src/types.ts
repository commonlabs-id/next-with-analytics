export interface WithAnalyticsConfig {
  /** Your Google Analytics tracking code. */
  trackingCode: string;
  /**
   * Enable IP anonymization.
   * https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization
   */
  anonymizeIp?: boolean;
  /**
   * Respect Do Not Track (DNT) headers.
   */
  respectDNT?: boolean;
  /**
   * If you would like to manually report pageview events (using the `pageview` util), set this to `true`.
   */
  disablePageview?: boolean;
}

export type GtagCommands = 'config' | 'set' | 'js' | 'event';

export interface GtagEventConfig {
  action: string;
  category: Gtag.EventParams['event_category'];
  label: Gtag.EventParams['event_label'];
  value: Gtag.EventParams['value'];
}

export interface GtagExceptionConfig {
  description: string;
  fatal: boolean;
}
