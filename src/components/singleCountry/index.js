import * as React from "react";
import CountryDropdownMenu from "./countryDropdownMenu";
import Flag from "./flag";

export default function SingleCountry() {
  const [country, setCountry] = React.useState("Portugal");

  return (
    <>
      <CountryDropdownMenu country={country} setCountry={setCountry} />
      <Flag country={country} />
    </>
  );
}
