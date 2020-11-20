/* eslint-disable no-console */

export function init(trackingCode?: string): void {
  console.log(`[Analytics] Init triggered for ${trackingCode}`);
}

export function pageview(): void {
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] Pageview triggered for ${window.location.pathname}`);
  }
}

export function event(category = '', action = '', _label = '', _value?: number): void {
  console.log(`[Analytics] Event for category ${category} and action ${action} triggered`);
}

export function exception(description = '', fatal = false): void {
  console.log(
    `[Analytics] ${fatal ? 'Fatal exception' : 'Exception'} with description ${description}`,
  );
}

export function ga(...args: any[]): void {
  console.log(`[Analytics] Called 'ga' function with args ${JSON.stringify(args)}`);
}
