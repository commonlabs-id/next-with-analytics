# next-with-analytics

> Minimalistic analytics helper for Next.js which respects Do Not Track (DNT) headers.

`next-with-analytics` is a tiny HOC that wraps a Next.js application with `react-ga` and some useful analytics helpers. It also allows you to respect Do Not Track (DNT) settings for visitors that have them enabled.

## Installation

```bash
# yarn
yarn add @pinjollist/next-with-analytics

# npm
npm install --save @pinjollist/next-with-analytics
```

## Usage

To use it, wrap your `_app` page with the HOC, passing the `next/router` instance, and some preferred options.

```jsx
// pages/_app.js

import App from 'next/app';
import Router from 'next/router';

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

### Options

#### `trackingCode?: string`

The Google Analytics tracking code of your website. Default: `''`

#### `respectDNT?: boolean`

Set to `true` to make the module respect Do Not Track (DNT). This will prevent `react-ga` to be initialised if your browser has DNT enabled. Default: `false`

## Using Analytics helpers

This HOC injects several analytics helper functions into your page. You can access it from the `analytics` prop. Typings for TypeScript projects are also available as `WithAnalyticsState`.

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
