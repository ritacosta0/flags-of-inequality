import "./App.css";
import * as React from "react";

import AllCountries from "./components/allCountries/index";
import Intro from "./components/intro";

function App() {
  return (
    <div className="App">
      <h1>🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      <Intro></Intro>
      <div style={{ margin: "2%" }}>
        <AllCountries></AllCountries>
      </div>
    </div>
  );
}

export default App;
