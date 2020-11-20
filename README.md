# next-with-analytics

![CI](https://github.com/commonlabs-id/next-with-analytics/workflows/CI/badge.svg)
![Codecov](https://img.shields.io/codecov/c/gh/commonlabs-id/next-with-analytics.svg)

> Minimalistic analytics helper for Next.js which respects Do Not Track (DNT) headers.

`next-with-analytics` helps you integrate [Google Analytics](https://analytics.google.com/) on your [Next.js](https://nextjs.org/) app with ease. It also allows you to respect Do Not Track (DNT) settings for visitors that have them enabled.

Other features include:

- Anonymize IP support
- Debug mode

## Installation

```bash
# yarn
yarn add @commonlabs-id/next-with-analytics

# npm
npm install --save @commonlabs-id/next-with-analytics
```

## Usage

In the bottom of your `_document.jsx` file, import the `<WithAnalytics />` component. This will load in the `gtag.js` scripts.

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AnalyticsScript } from '@commonlabs-id/next-with-analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <AnalyticsScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

### Props

The `WithAnalytics` component accepts these props.

```ts
export interface WithAnalyticsProps {
  /**
   * Load the script with the `async` attribute.
   */
  async?: boolean;
  /**
   * Your Google Analytics tracking code.
   */
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
   * If you would like to manually report pageview events (using the `pageview` helper), set this to `true`.
   */
  disablePageview?: boolean;
}
```

## Using Analytics helpers

`next-with-analytics` exports several helper functions to help you interact with Google Analytics. These functions are also fully typed.

```jsx
import Link from 'next/link';
import { event } from '@commonlabs-id/next-with-analytics';

function IndexPage({ analytics }) {
  const handleClick = () => {
    event({ action: 'sign_up' });
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

`function init({ trackingCode, anonymizeIp, disablePageview }: WithAnalyticsConfig): void`

Initializes Next.js analytics.

#### pageview

`function pageview(trackingCode: string): void`

Sends `page_view` event manually. Can be called e.g. on router location change.

> **Caution:** If you send manual pageviews without disabling pageview measurement, you may end up with pageviews counted twice. For more details, [click here](https://developers.google.com/analytics/devguides/collection/gtagjs/pages#manual_pageviews).

#### event

`function event({ action, category, label, value }: GtagEventConfig): void`

Sends a Google Analytics [event](https://developers.google.com/analytics/devguides/collection/gtagjs/events).

#### exception

`function exception({ description, fatal = false }: GtagExceptionConfig): void`

Sends a Google Analytics [exception event](https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions) for tracking exceptions.

#### gtag

`function gtag(...args: any[]): void`

If none of the helpers fit your use-case, use this helper to call the `gtag()` function manually.

## Contributing

Contributions and Pull Requests welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) beforehand.

## License

[MIT](LICENSE) &copy; Resi Respati.
