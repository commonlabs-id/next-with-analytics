# next-with-analytics

![CircleCI](https://img.shields.io/circleci/build/github/pinjollist/next-with-analytics.svg)
![Codecov](https://img.shields.io/codecov/c/gh/pinjollist/next-with-analytics.svg)

> Minimalistic analytics helper for Next.js which respects Do Not Track (DNT) headers.

`next-with-analytics` is a tiny HOC that wraps a Next.js application with `react-ga` and some useful analytics helpers. It also allows you to respect Do Not Track (DNT) settings for visitors that have them enabled.

Other features include:

- Anonymize IP support
- Debug mode

## Installation

```bash
# yarn
yarn add @pinjollist/next-with-analytics

# npm
npm install --save @pinjollist/next-with-analytics
```

## Usage

### Initialising analytics

The `initAnalytics` function will create an [analytics instance](#analytics-instance) with any [options](#options) passed into it. To use it, create a custom `_app` page with the `initAnalytics()` called inside it. You can now use the analytics instance to create a route event listener for tracking pageviews, as well as passing [analytics helper functions](#using-analytics-helpers) into all pages as a prop.

```jsx
// pages/_app.js

import App from 'next/app';
import Router from 'next/router';
import { initAnalytics } from '@pinjollist/next-with-analytics';

const options = {
  trackingCode: process.env.GOOGLE_ANALYTICS,
  respectDNT: true,
};
const analyticsInstance = initAnalytics(options);

class MyApp extends App {
  componentDidMount() {
    const { handleRouteChange } = analyticsInstance;

    // Enable tracking page views for route change
    Router.events.on('routeChangeComplete', handleRouteChange);
  }

  componentWillUnmount() {
    const { handleRouteChange } = analyticsInstance;

    // Disable tracking page views for route change before unmount
    Router.events.off('routeChangeComplete', handleRouteChange);
  }

  render() {
    const { Component, pageProps } = this.props;
    // Add the Analytics helpers to all pages.
    const { analytics } = analyticsInstance;

    return (
      <Container>
        <Component analytics={analytics} {...pageProps} />
      </Container>
    );
  }
}
```

### `withAnalytics` HOC

You can also use the `withAnalytics` HOC to easily wrap your entire app with `next-with-analytics`. To use it, wrap the `_app` page with the HOC, passing the `next/router` instance, and some preferred options.

**IMPORTANT:** Note that on Next.js 9 and above, this will disable the [Automatic Static Optimization](https://nextjs.org/docs#automatic-prerendering) feature, since it will also try to modify `getInitialProps` in all pages. This HOC remains available to ensure backwards compatibility with Next.js 8.

```jsx
// pages/_app.js

import App from 'next/app';
import Router from 'next/router';
import { withAnalytics } from '@pinjollist/next-with-analytics';

const options = {
  trackingCode: process.env.GOOGLE_ANALYTICS,
  respectDNT: true,
};
const nextWithAnalytics = withAnalytics(Router, options);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, analytics } = this.props;
    return (
      <Container>
        <Component analytics={analytics} {...pageProps} />
      </Container>
    );
  }
}

export default nextWithAnalytics(MyApp);
```

### Analytics Instance

The `initAnalytics()` function creates an analytics instance with any [options](#options) passed into it. It returns an `AnalyticsInstance` object, which contains the following:

#### `analytics?: AnalyticsHelpers`

An object containing all analytics helper functions. See [Using Analytics helpers](#using-analytics-helpers) to learn more about these helper functions.

#### `handleRouteChange: () => void`

Used to handle analytics pageview tracking after route change. Use it with [Router Events](https://nextjs.org/docs#router-events):

```jsx
class MyApp extends App {
  // ...

  componentDidMount() {
    const { handleRouteChange } = analyticsInstance;

    // Enable tracking page views for route change
    Router.events.on('routeChangeComplete', handleRouteChange);
  }

  componentWillUnmount() {
    const { handleRouteChange } = analyticsInstance;

    // Disable tracking page views for route change before unmount
    Router.events.off('routeChangeComplete', handleRouteChange);
  }
}
```

### Options

#### `trackingCode?: string`

The Google Analytics tracking code of your website. Default: `''`

#### `respectDNT?: boolean`

Set to `true` to make the module respect Do Not Track (DNT). This will prevent `react-ga` to be initialised if your browser has DNT enabled. Default: `false`

## Using Analytics helpers

You can add the provided Analytics helpers directly into the `analytics` prop in the Next.js `_app` page. Typings for TypeScript projects are also available as `WithAnalyticsState`.

```jsx
import Link from 'next/link';

function IndexPage({ analytics }) {
  const handleClick = () => {
    if (analytics) {
      analytics.event('Button Click', 'Signup to Platform');
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Try out our platform!</h1>
        <Link href="/signup" onClick={handleClick}>
          <a>Signup Now</a>
        </Link>
      </Container>
    </Layout>
  );
}
```

### List of Helpers

#### init

`function init(trackingCode?: string | undefined): void`

Initializes Next.js analytics.

#### pageview

`function pageview(): void`

Tracks pageview. Can be called e.g. on router location change.

#### event

`function event(category?: string, action?: string): void`

Sends a Google Analytics [event](https://developers.google.com/analytics/devguides/collection/analyticsjs/events).

#### exception

`function exception(description?: string, fatal?: boolean): void`

Sends a Google Analytics [exception event](https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions) for tracking exceptions.

## Contributing

Contributions and Pull Requests welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) beforehand.

## License

[MIT](LICENSE) &copy; Resi Respati.
