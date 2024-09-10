import React, { useEffect, useState } from "react";

import Grid from "@/components/Grid";
import Head from "next/head";
import Controls from "@/components/Controls";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Legend from "@/components/Legend";
import MessageUnsupportedBrowser from "@/components/MessageUnsupportedBrowser";
import Methodology from "@/components/Methodology";

function Home() {
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);

  useEffect(() => {
    if (navigator && navigator.userAgent.match(/SamsungBrowser/i)) {
      setIsSamsungBrowser(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Flags of Inequality</title>
      </Head>

      {!isSamsungBrowser ? (
        <>
          <div className="w-10/12 mx-auto mt-10 lg:w-3/4">
            <Header type="main" />
            <Intro />
          </div>
          <div id="flags" className="py-4">
            <Controls />
            <Legend />
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
