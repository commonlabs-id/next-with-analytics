/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */

import React from 'react';
import App, { AppProps } from 'next/app';
import { SingletonRouter } from 'next/router';

import * as debugAnalytics from './helpers/debug';
import * as prodAnalytics from './helpers/prod';
import { WithAnalyticsConfig, AnalyticsHelpers } from './types';
import getDisplayName from './utils/getDisplayName';

// This actually follows a similar pattern as https://github.com/sergiodxa/next-ga, but we added
// an option to let the analytics respect Do Not Track (DNT) requests.

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

export interface WithAnalyticsState {
  analytics?: Partial<AnalyticsHelpers>;
}

export function withAnalytics(Router: SingletonRouter, config: WithAnalyticsConfig = {}) {
  return (WrappedComponent: typeof App) => {
    return class extends React.Component<AppProps & WithAnalyticsState, WithAnalyticsState> {
      public static displayName = `withAnalytics(${getDisplayName(WrappedComponent)})`;

      public analytics: AnalyticsHelpers | undefined = undefined;

      public constructor(props: AppProps) {
        super(props);

        this.state = {
          analytics: undefined,
        };
      }

      public componentDidMount() {
        if (isDev || isLocalhost) {
          this.analytics = debugAnalytics;
        }

        if (!isDntEnabled || !config.respectDNT) {
          // Only load analytics if we're sure DNT is not enabled AND respectDNT is enabled
          this.analytics = prodAnalytics;
        }

        if (this.analytics) {
          // init analytics
          this.analytics.init(config.trackingCode);
          // log page
          this.analytics.pageview();

          this.setState({
            analytics: this.analytics,
          });
        }

        Router.events.on('routeChangeComplete', this.handleRouteChange);
      }

      public componentWillUnmount() {
        Router.events.off('routeChangeComplete', this.handleRouteChange);
      }

      public handleRouteChange = () => {
        if (this.analytics) {
          // log page
          this.analytics.pageview();
        }
      };

      public render() {
        const { analytics } = this.state;
        return <WrappedComponent {...this.props} analytics={analytics} />;
      }
    };
  };
}
