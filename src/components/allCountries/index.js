import React from "react";

import AllFlags from "./allFlags";
import YearDropdownMenu from "./yearDropdownMenu";

export default function AllCountries() {
  const [year, setYear] = React.useState(2022);

  return (
    <>
      <YearDropdownMenu year={year} setYear={setYear} />
      <AllFlags year={year} />
    </>
  );
}
