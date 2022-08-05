import "./App.css";
import * as React from "react";

import AllCountries from "./components/allCountries/index";
import Flag from "./components/Flag";

function App() {
  return (
    <div className="App">
      <h1>🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      <Flag country={"Portugal"} year={2021} />

      <div style={{ margin: "2%" }}>
        <AllCountries></AllCountries>
      </div>
    </div>
  );
}

export default App;
