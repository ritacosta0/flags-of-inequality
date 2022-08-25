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
import Legend from "../components/Legend";
import { nth } from "../utils";
import Head from "next/head";

function Home() {
  const [year, setYear] = useState(2022);
  const [orderAlphabetical, setOrderAlphabetical] = useState(true);
  const [orderRanking, setOrderRanking] = useState(true);
  const [sortDict, setSortDict] = useState({
    type: "ranking",
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
      <Head>
        <title>Flags of Inequality</title>
      </Head>
      <Intro />
      <div id="flags" className="py-4">
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
        <Legend></Legend>
        <div
          className="flex flex-row flex-wrap justify-center gap-x-10 gap-y-20"
          ref={flagsContainer}
          aria-label={`Showing data from ${year}. Countries are sort ${
            sortDict.type == "country" ? "alphabetically" : "by global ranking"
          } and in ${sortDict.ascending ? "ascending" : "descending"} order.`}
          tabIndex={0}
        >
          {countries.map((country) => {
            return (
              <motion.div key={country} className="mt-4" layout>
                <Link href={`/timeline/${encodeURIComponent(country)}`}>
                  <a href={`/timeline/${encodeURIComponent(country)}`}>
                    <motion.div
                      style={{
                        ...flagDimensions,
                        cursor: "pointer",
                      }}
                    >
                      <Flag country={country} year={year} />
                      <div className="flex gap-2 mt-2">
                        <h3 className="font-medium" aria-hidden>
                          {`${flag(country) || ""} ${country}`}{" "}
                          <span className="text-slate-400">{` | ${nth(
                            data.find(
                              (d) => d.country === country && d.year === year
                            )?.ranking
                          )}`}</span>
                        </h3>
                      </div>
                    </motion.div>
                  </a>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Methodology />
    </>
  );
}

export default Home;
