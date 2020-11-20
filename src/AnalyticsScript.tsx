/* eslint-disable react/no-danger */
import * as React from 'react';
import { WithAnalyticsConfig } from 'types';

interface AnalyticsScriptProps extends WithAnalyticsConfig {
  /** Load the script with the `async` attribute. */
  async?: boolean;
}

const AnalyticsScript: React.FC<AnalyticsScriptProps> = ({
  trackingCode,
  async,
  anonymizeIp,
  respectDNT,
  disablePageview,
}) => {
  const buildInitialiseScript = () => {
    if (respectDNT) {
      return `
        if(!(parseInt(navigator.doNotTrack) === 1 || parseInt(window.doNotTrack) === 1 || parseInt(navigator.msDoNotTrack) === 1 || navigator.doNotTrack === "yes")) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
        }
      `;
    }

    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `;
  };

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingCode}`} />
      <script
        async={async}
        dangerouslySetInnerHTML={{
          __html: `
            ${buildInitialiseScript()}
            if (typeof gtag === "function") {
              gtag('js', new Date());
              gtag('config', '${trackingCode}', {
                page_path: window.location.pathname,
                anonymize_ip: ${anonymizeIp ? 'true' : 'false'},
                send_page_view: ${disablePageview ? 'false' : 'true'}
              });
            }
          `,
        }}
      />
    </>
  );
};

export default AnalyticsScript;
