import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏳️‍🌈</text></svg>"
        />
      </Head>
      <body className="mt-12 mb-20 bg-slate-800 text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
