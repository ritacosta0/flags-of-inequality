import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { flag } from "country-emoji";

import { getData } from "../../data";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { Flag } from "../../components/Flag";

export default function Timeline() {
  const router = useRouter();
  const { country } = router.query;
  const [isVertical, setIsVertical] = useState(false);
  const data = useMemo(() => getData({ countries: [country] }), [country]);
  const years = data.map((d) => d.year).sort();
  const [flagsContainer, flagDimensions] = useFlagDimensions(
    isVertical ? 1 : years.length
  );

  useEffect(() => {
    setIsVertical(window.innerWidth < 400);
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-3xl font-medium text-slate-800 ">{`${
        flag(country) || ""
      } ${country}`}</h2>
      <div
        className={`flex ${
          isVertical ? "flex-col" : "flex-row"
        }  w-10/12 gap-4 mt-4`}
        ref={flagsContainer}
      >
        {years.map((year) => (
          <div
            key={`${country}-${year}`}
            className={`flex ${
              isVertical ? "flex-row-reverse justify-end" : "flex-col"
            } gap-4`}
            style={isVertical ? { marginTop: "20%" } : {}}
          >
            <Box
              /* This rotation doesn't work particularly well for the layout. @TODO: implement rotation prop on Flag. */
              className={isVertical && "rotate-90"}
              sx={{
                ...flagDimensions,
              }}
            >
              <Flag country={country} year={year} />
            </Box>
            <h3>{year}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
