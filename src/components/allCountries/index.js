import * as React from "react";
import YearDropdownMenu from "./yearDropdownMenu";
import AllFlags from "./allFlags";

export default function AllCountries() {
  const [year, setYear] = React.useState("2021");

  return (
    <>
      <YearDropdownMenu year={year} setYear={setYear}></YearDropdownMenu>
      <AllFlags year={year}></AllFlags>
    </>
  );
}
