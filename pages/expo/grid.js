import React, { useEffect, useState } from "react";

import Controls from "@/components/Controls";
import Grid from "@/components/Grid";
import Legend from "@/components/Legend";
import MessageUnsupportedBrowser from "@/components/MessageUnsupportedBrowser";
import { Methodology } from "@/components/Methodology";

function ExpoGrid() {
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);

  useEffect(() => {
    if (navigator && navigator.userAgent.match(/SamsungBrowser/i)) {
      setIsSamsungBrowser(true);
    }
  }, []);

  return (
    <>
      {!isSamsungBrowser ? (
        <>
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

export default ExpoGrid;
