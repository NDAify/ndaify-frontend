import React from 'react';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import getConfig from 'next/config';

import { ServerStyleSheet } from 'styled-components';

import { StaticHead } from '../components/Head/Head';
import parseLocaleParts from '../utils/parseLocaleParts';

const { publicRuntimeConfig: { GOOGLE_TAG_MANAGER_ID } } = getConfig();

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(
          <>
            <StaticHead />
            <App
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            />
          </>,
        ),
      });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {
              initialProps.styles
            }
            {
              sheet.getStyleElement()
            }
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const pageProps = this.props.__NEXT_DATA__.props;

    let preferredTheme;
    let language;
    let dir;

    if (pageProps) {
      ({ preferredTheme } = pageProps);
      ({ language, dir } = parseLocaleParts(pageProps.locale));
    }

    return (
      <Html lang={language} dir={dir}>
        <Head />
        <body className={preferredTheme}>
          <noscript>
            <iframe
              title="Google Analytics Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
