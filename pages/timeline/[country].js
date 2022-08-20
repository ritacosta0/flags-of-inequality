import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";
import { flag } from "country-emoji";

import { getData } from "../../data";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { Flag } from "../../components/Flag";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { nth } from "../../utils";

export default function Timeline() {
  const router = useRouter();
  const { country } = router.query;
  const [isVertical, setIsVertical] = useState(false);
  const data = useMemo(() => getData({ countries: [country] }), [country]);
  const years = data.map((d) => d.year).sort();
  const [flagsContainer, flagDimensions] = useFlagDimensions(
    isVertical ? 1 : years.length
  );

  const url = data.find((d) => d.year === 2022)?.url;

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 400);
    };
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`w-full mx-auto ${isVertical ? "mt-4" : "mt-[30vh]"}`}>
      <Link href="/#flags">
        <span className="font-medium cursor-pointer text-slate-300 hover:text-slate-100">
          <ArrowBack /> Back
        </span>
      </Link>
      <h2 className="mt-8 text-4xl font-medium ">{`${
        flag(country) || ""
      } ${country}`}</h2>
      <div className="my-4 cursor-pointer text-slate-400 hover:text-slate-300">
        <a href={url}>
          <LinkIcon />
          <span className="ml-1 ">{`Read more on Rainbow Data 2022`}</span>
        </a>
      </div>
      <div
        className={`flex ${
          isVertical ? "flex-col-reverse" : "flex-row"
        }  gap-4 mt-10`}
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
            <div className="flex gap-2">
              <h3> {year}</h3>
              <h3 className="text-slate-400">{` | ${nth(
                data.find((d) => d.year === year)?.ranking
              )}`}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
