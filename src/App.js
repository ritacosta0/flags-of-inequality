import "./App.css";
import * as React from "react";

import AllCountries from "./components/allCountries/index";

function App() {
  return (
    <div className="App">
      <h1>🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      <div style={{ margin: "2%" }}>
        <AllCountries></AllCountries>
      </div>
    </div>
  );
}

export default App;
