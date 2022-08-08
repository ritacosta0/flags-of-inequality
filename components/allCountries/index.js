import React from "react";

import AllFlags from "./allFlags";
import Controls from "./Controls";

export default function AllCountries() {
  const [year, setYear] = React.useState(2022);
  const [orderAlphabetical, setOrderAlphabetical] = React.useState(true);
  const [orderRanking, setOrderRanking] = React.useState(true);
  const [sortDict, setSortDict] = React.useState({
    type: "alphabetical",
    ascending: true,
  });

  return (
    <>
      <Controls
        year={year}
        setYear={setYear}
        orderRanking={orderRanking}
        setOrderRanking={setOrderRanking}
        orderAlphabetical={orderAlphabetical}
        setOrderAlphabetical={setOrderAlphabetical}
        sortDict={sortDict}
        setSortDict={setSortDict}
      />
      <AllFlags
        year={year}
        orderRanking={orderRanking}
        orderAlphabetical={orderAlphabetical}
        sortDict={sortDict}
      />
    </>
  );
}
