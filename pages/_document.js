import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏳️‍🌈</text></svg>"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/ritacosta0/flags-of-inequality/main/assets/preview.png"
        />
        <meta
          name="twitter:description"
          content="A visualization of the rainbow flag to portray to what extent different dimensions of queer life are disregarded by state regulations."
        />
        <meta
          name="twitter:image:alt"
          content="Webpage showing a rainbow per country in a grid, some stripes are smaller or non-existent"
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={"www.flags-of-inequality.com"}
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/ritacosta0/flags-of-inequality/main/assets/preview.png"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={"Flags of Inequality"}
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={"Flags of Inequality"}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="A visualization of the rainbow flag to portray to what extent different dimensions of queer life are disregarded by state regulations."
          key="ogdesc"
        />
      </Head>
      <body className="mt-12 mb-20 bg-slate-800 text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
