import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-3/4 mx-auto mt-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
