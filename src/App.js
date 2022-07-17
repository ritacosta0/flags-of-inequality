import "./App.css";
import * as React from "react";

import ControlMenu from "./components/controlMenu";
import SingleCountry from "./components/singleCountry/index";
import AllCountries from "./components/allCountries/index";

function App() {
  const [buttonValue, setButtonValue] = React.useState("single country");

  return (
    <div className="App">
      <h1>🏳️‍🌈Flags of inequality🏳️‍🌈</h1>
      <ControlMenu
        buttonValue={buttonValue}
        setButtonValue={setButtonValue}
      ></ControlMenu>
      <div style={{ margin: "2%" }}>
        {" "}
        {buttonValue === "single country" ? (
          <SingleCountry></SingleCountry>
        ) : (
          <AllCountries></AllCountries>
        )}
      </div>
    </div>
  );
}

export default App;
