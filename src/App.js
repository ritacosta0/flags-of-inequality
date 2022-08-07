import * as React from "react";

import AllCountries from "./components/allCountries/index";

function App() {
  return (
    <div className="w-3/4 mx-auto mt-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold">🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      </header>
      <div>
        <AllCountries />
      </div>
    </div>
  );
}

export default App;
