/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import App, { AppProps } from 'next/app';
import { SingletonRouter } from 'next/router';

import { WithAnalyticsConfig, AnalyticsHelpers } from './types';
import getDisplayName from './utils/getDisplayName';
import initAnalytics from './analytics';

// This actually follows a similar pattern as https://github.com/sergiodxa/next-ga, but we added
// an option to let the analytics respect Do Not Track (DNT) requests.

export interface WithAnalyticsState {
  analytics?: Partial<AnalyticsHelpers>;
}

/**
 * Wraps your entire app with the Analytics instance.
 *
 * **IMPORTANT:** Note that on Next.js 9 and above, this will disable the
 * [Automatic Static Optimization](https://nextjs.org/docs#automatic-prerendering) feature, since it
 * will also try to modify `getInitialProps` in all pages. This HOC remains available to ensure
 * backwards compatibility with Next.js 8.
 */
export default function withAnalytics(Router: SingletonRouter, config: WithAnalyticsConfig = {}) {
  return (WrappedComponent: typeof App) => {
    return class extends React.Component<AppProps & WithAnalyticsState, WithAnalyticsState> {
      public analyticsInstance = initAnalytics(config);

      public static displayName = `withAnalytics(${getDisplayName(WrappedComponent)})`;

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

      public static getInitialProps = WrappedComponent.getInitialProps || undefined;

      public render() {
        const { analytics } = this.state;
        return <WrappedComponent {...this.props} analytics={analytics} />;
      }
    };
  };
}
