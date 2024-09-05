import React, { useEffect, useMemo, useState } from "react";

import Grid from "@/components/Grid";
import Head from "next/head";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Legend from "../components/Legend";
import MessageUnsupportedBrowser from "../components/MessageUnsupportedBrowser";
import { Methodology } from "../components/Methodology";
import { getData } from "../data";
import { useFlagDimensions } from "../hooks/useFlagDimensions";

function Home() {
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);
  const [year, setYear] = useState(2024);
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

  useEffect(() => {
    if (navigator && navigator.userAgent.match(/SamsungBrowser/i)) {
      setIsSamsungBrowser(true);
    }
  }, []);

  const countries = data.map((d) => d.country);

  return (
    <>
      <Head>
        <title>Flags of Inequality</title>
      </Head>

      {!isSamsungBrowser ? (
        <>
          <div className="w-10/12 mx-auto mt-10 lg:w-3/4">
            <Header />
            <Intro />
          </div>
          <div id="flags" className="py-4">
            <Controls />
            <Legend position="center" />
            <Grid />
          </div>
          <Methodology />
        </>
      ) : (
        <MessageUnsupportedBrowser />
      )}
    </>
  );
}

export default Home;
