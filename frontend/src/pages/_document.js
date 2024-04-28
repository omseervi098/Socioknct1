import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          content="X-Content-Type-Options=nosniff"
          httpEquiv="Content-Type"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo2.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Socioknct" />
        <meta
          name="description"
          content="Socioknct is a social media platform that connects people with their friends and family."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Socioknct" />
        <meta property="og:title" content="Socioknct" />
        <meta
          property="og:description"
          content="Socioknct is a social media platform that connects people with their friends and family."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
