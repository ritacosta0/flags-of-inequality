import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="w-3/4 mx-auto mt-8">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
