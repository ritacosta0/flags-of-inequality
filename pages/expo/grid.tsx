import React, { useEffect, useState } from "react";

import Grid from "@/components/Grid";
import Legend from "@/components/Legend";
import MessageUnsupportedBrowser from "@/components/MessageUnsupportedBrowser";
import Methodology from "@/components/Methodology";
import { useHotkeys } from "react-hotkeys-hook";
import Controls from "@/components/Controls";

function ExpoGrid() {
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useHotkeys("meta+c", () => {
    setShowControls((prev) => !prev);
  });

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
            {showControls && <Controls />}
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

export default ExpoGrid;
