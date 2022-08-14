import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-3/4 mx-auto mt-8">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
