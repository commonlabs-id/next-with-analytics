import { GtagEventConfig, GtagExceptionConfig, WithAnalyticsConfig } from 'types';

export function init({ trackingCode, anonymizeIp, disablePageview }: WithAnalyticsConfig): void {
  if (typeof window.gtag === 'function' && typeof window !== 'undefined') {
    window.gtag('config', trackingCode, {
      page_path: window.location.pathname,
      anonymize_ip: anonymizeIp,
      send_page_view: !disablePageview,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(trackingCode: string): void {
  if (typeof window.gtag === 'function' && typeof window !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      send_to: trackingCode,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: GtagEventConfig): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      value,
      event_category: category,
      event_label: label,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
export function exception({ description, fatal = false }: GtagExceptionConfig): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      description,
      fatal,
    });
  }
}

export const gtag: Gtag.Gtag = (...args: any[]): void => {
  if (typeof window.gtag === 'function') {
    (window as any).gtag(...args);
  }
};
