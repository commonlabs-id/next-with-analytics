/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */

import React from 'react';
import App, { AppProps } from 'next/app';
import { SingletonRouter } from 'next/router';

import { WithAnalyticsConfig, AnalyticsHelpers } from './types';
import getDisplayName from './utils/getDisplayName';
import { initAnalytics } from './analytics';

// This actually follows a similar pattern as https://github.com/sergiodxa/next-ga, but we added
// an option to let the analytics respect Do Not Track (DNT) requests.

export interface WithAnalyticsState {
  analytics?: Partial<AnalyticsHelpers>;
}

/**
 * Wraps your entire app with the Analytics instance
 */
export function withAnalytics(Router: SingletonRouter, config: WithAnalyticsConfig = {}) {
  return (WrappedComponent: typeof App) => {
    return class extends React.Component<AppProps & WithAnalyticsState, WithAnalyticsState> {
      public static displayName = `withAnalytics(${getDisplayName(WrappedComponent)})`;

      public static getInitialProps = WrappedComponent.getInitialProps || undefined;

      public analyticsInstance = initAnalytics(config);

      public constructor(props: AppProps) {
        super(props);

        this.state = {
          analytics: undefined,
        };
      }

      public componentDidMount() {
        const { analytics, handleRouteChange } = this.analyticsInstance;

        if (analytics) {
          this.setState({
            analytics,
          });
        }

        Router.events.on('routeChangeComplete', handleRouteChange);
      }

      public componentWillUnmount() {
        const { handleRouteChange } = this.analyticsInstance;

        Router.events.off('routeChangeComplete', handleRouteChange);
      }

      public render() {
        const { analytics } = this.state;
        return <WrappedComponent {...this.props} analytics={analytics} />;
      }
    };
  };
}
