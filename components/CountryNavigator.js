import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { format } from "d3-format";
import Head from "next/head";
import { flag } from "country-emoji";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { nth } from "../utils";
import { RainbowLink } from "../components/RainbowLink";
import Legend from "../components/Legend";
import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../constants";
import { getData } from "../data";
import { useFlagDimensions } from "../hooks/useFlagDimensions";
import { Flag } from "../components/Flag";

const CountryNavigator = () => {
  const [year, setYear] = useState(2024);
  const [sortDict, setSortDict] = useState({
    type: "ranking",
    ascending: true,
  });

  const data = useMemo(
    () => getData({ years: [year], sortingParams: sortDict }),
    [year, sortDict]
  );

  const countries = data.map((d) => d.country);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const currentCountry = countries[currentCountryIndex];

  const dataCountry = useMemo(() => getData({ countries: currentCountry }), [
    currentCountry,
  ]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      const updateCountry = () => {
        setCurrentCountryIndex(
          (prevIndex) => (prevIndex + 1) % countries.length
        );
      };

      interval = setInterval(updateCountry, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const years = dataCountry.map((d) => d.year).sort();
  const uniqueYears = [...new Set(years)];

  const lastYear = [uniqueYears[uniqueYears.length - 1]];
  const allButLast = uniqueYears.slice(0, uniqueYears.length - 1);
  const [flagsContainer, flagDimensions] = useFlagDimensions(1.3, 0);
  const [allFlagsContainer, allFlagDimensions] = useFlagDimensions(
    allButLast.length,
    null
  );

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleNextCountry = () => {
    setCurrentCountryIndex((prevIndex) => (prevIndex + 1) % countries.length);
  };

  const handlePreviousCountry = () => {
    setCurrentCountryIndex((prevIndex) =>
      prevIndex === 0 ? countries.length - 1 : prevIndex - 1
    );
  };
  const SortButton = styled(Button)(({ theme }) => ({
    borderColor: " #cbd5e1",
    color: " #cbd5e1",
    "&:hover": {
      borderColor: "#f8fafc",
      color: "#f8fafc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      color: "#f8fafc",
      borderColor: "#f8fafc",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  }));
  const colorScale = scaleOrdinal({
    domain: CATEGORIES_ORDERED_LIST,
    range: RAINBOW_COLORS,
  });

  return (
    <div className={`w-full mx-auto `}>
      <Head>
        <title>{`${currentCountry ?? "Loading"} - Flags of Inequality`}</title>
      </Head>
      <h2 className="sr-only">{`Timeline of ${currentCountry} from 2015 to 2024`}</h2>
      <div className={`flex  gap-4 mt-10`} ref={allFlagsContainer}>
        {allButLast.map((year) => (
          <div
            key={`${currentCountry}-${year}`}
            className={`flex flex-col gap-4 mt-4`}
            layout
          >
            <motion.div key="flag">
              <Box
                sx={{
                  width: allFlagDimensions.width,
                  height: allFlagDimensions.height,
                }}
              >
                <Flag
                  country={currentCountry}
                  year={year}
                  isTimeline={"true"}
                  orientation={"horizontal"}
                  isInteractive={false}
                />
              </Box>
            </motion.div>
            {dataCountry.find((d) => d.year === year)?.ranking !== undefined ? (
              <div className="flex gap-2 ">
                <h3 aria-hidden>
                  {" "}
                  {year}{" "}
                  <span className="text-slate-400">{` | ${nth(
                    dataCountry.find((d) => d.year === year)?.ranking
                  )}`}</span>
                </h3>
                <h3></h3>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className={`flex mt-10 gap-4 visible`} ref={flagsContainer}>
        {lastYear.map((year) => (
          <div key={`${currentCountry}-${year}`}>
            <motion.div key="flag">
              <Box
                sx={{
                  width: flagDimensions.width,
                  height: flagDimensions.height,
                }}
              >
                <Flag
                  country={currentCountry}
                  year={year}
                  isTimeline={"false"}
                  orientation={"horizontal"}
                  isLastYear={"true"}
                  isInteractive={false}
                />
              </Box>
            </motion.div>
          </div>
        ))}
        <div style={{ display: "inline-block", alignSelf: "flex-end" }}>
          <p style={{ color: colorScale("equality") }}>
            Equality and non-descrimination{" "}
            {format(".0%")(data[currentCountryIndex].equality)}
          </p>
          <p style={{ color: colorScale("family") }}>
            Family {format(".0%")(data[currentCountryIndex].family)}
          </p>
          <p style={{ color: colorScale("hate") }}>
            Hate crime and hate speech{" "}
            {format(".0%")(data[currentCountryIndex].hate)}
          </p>
          <p style={{ color: colorScale("gender") }}>
            Legal gender recognition & Intersex bodily autonomy{" "}
            {format(".0%")(data[currentCountryIndex].gender)}
          </p>

          <p style={{ color: colorScale("civil") }}>
            Civil society space {format(".0%")(data[currentCountryIndex].civil)}
          </p>

          <p style={{ color: colorScale("asylum") }}>
            Asylum {format(".0%")(data[currentCountryIndex].asylum)}
          </p>
        </div>
      </div>
      <div
        className="flex mt-4 text-4xl font-medium gap-14"
        style={{ width: flagDimensions.width, justifyContent: "space-between" }}
      >
        <h2 tabIndex={0}>
          {currentCountry}{" "}
          <span className="text-slate-400">{` | ${nth(
            dataCountry.find((d) => d.year === year)?.ranking
          )}`}</span>
        </h2>
        <div className="flex gap-2 text-slate-400">
          <SortButton
            onClick={handlePreviousCountry}
            variant="outlined"
            size="small"
          >
            <ArrowCircleLeftOutlinedIcon></ArrowCircleLeftOutlinedIcon>
          </SortButton>
          <SortButton onClick={handleStart} variant="outlined" size="small">
            <PlayCircleOutlineIcon></PlayCircleOutlineIcon>
          </SortButton>
          <SortButton onClick={handleStop} variant="outlined" size="small">
            <PauseCircleOutlineIcon></PauseCircleOutlineIcon>
          </SortButton>
          <SortButton
            onClick={handleNextCountry}
            variant="outlined"
            size="small"
          >
            <ArrowCircleRightOutlinedIcon></ArrowCircleRightOutlinedIcon>
          </SortButton>
        </div>
      </div>
    </div>
  );
};

export default CountryNavigator;
