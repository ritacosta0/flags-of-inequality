import React, { useState, useMemo } from "react";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { flag } from "country-emoji";
import Link from "next/link";

import Controls from "../components/Controls";
import { Flag } from "../components/Flag";
import { getData } from "../data";
import { useFlagDimensions } from "../hooks/useFlagDimensions";
import { Intro } from "../components/Intro";
import { Methodology } from "../components/Methodology";

function Home() {
  const [year, setYear] = useState(2022);
  const [orderAlphabetical, setOrderAlphabetical] = useState(true);
  const [orderRanking, setOrderRanking] = useState(true);
  const [sortDict, setSortDict] = useState({
    type: "alphabetical",
    ascending: true,
  });
  const [flagsContainer, flagDimensions] = useFlagDimensions();

  const data = useMemo(
    () => getData({ years: [year], sortingParams: sortDict }),
    [year, sortDict]
  );
  const countries = data.map((d) => d.country);

  return (
    <>
      <Intro />
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
      <div
        className="flex flex-row flex-wrap justify-center gap-12"
        ref={flagsContainer}
      >
        {countries.map((country) => {
          return (
            <motion.div key={country} className="mt-4" layout>
              <Link href={`/timeline/${encodeURIComponent(country)}`}>
                <motion.div
                  style={{
                    ...flagDimensions,
                    cursor: "pointer",
                  }}
                >
                  <Flag country={country} year={year} />
                  <h3 className="font-medium">{`${
                    flag(country) || ""
                  } ${country}`}</h3>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <Methodology />
    </>
  );
}

export default Home;
