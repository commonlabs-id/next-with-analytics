import ReactGA from 'react-ga';

export function init(trackingCode?: string): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== 'undefined' && !(window as any).GA_INITIALIZED && trackingCode) {
    ReactGA.initialize(trackingCode);
  }
}

export function pageview(): void {
  if (typeof window !== 'undefined') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
}

export function event(category = '', action = '', label = '', value?: number): void {
  if (category && action) {
    ReactGA.event({ category, action, label, value });
  }
}

export function exception(description = '', fatal = false): void {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}

export function ga(...args: any[]): void {
  ReactGA.ga(...args);
}
