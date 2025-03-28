import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Box from "@mui/material/Box";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { format } from "d3-format";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import Flag from "@/components/Flag";
import OutlineButton from "@/components/OutlineButton";
import {
  CATEGORIES_FULL_NAME,
  CATEGORIES_ORDERED_LIST,
  RAINBOW_COLORS,
} from "@/constants";
import { getData } from "@/data";
import { useFlagDimensions } from "@/hooks/useFlagDimensions";
import { nth } from "@/utils";
import { $FixMe } from "@/utils/defs";
import { stack as d3Stack } from "d3-shape";

extend([a11yPlugin]);

const YEAR = 2024;
const data = getData({
  years: [YEAR],
  sortingParams: {
    type: "ranking",
    ascending: true,
  },
});

const CountryNavigator = () => {
  const countries = data.map((d) => d.country);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const currentCountry = countries[currentCountryIndex];

  const dataCountry = useMemo(
    () =>
      getData({
        countries: [currentCountry],
      }),
    [currentCountry]
  );

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      const updateCountry = () => {
        setCurrentCountryIndex(
          (prevIndex) => (prevIndex + 1) % countries.length
        );
      };

      interval = setInterval(updateCountry, 3000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const years = dataCountry.map((d) => d.year).sort();
  const uniqueYears = [...new Set(years)];

  const allButLast = uniqueYears.slice(0, uniqueYears.length - 1);
  const [flagsContainer, flagDimensions] = useFlagDimensions(1.3);

  /* we fix the number of flags per row to 9, to avoid size transitions between countries with different number of years, such as N. Macedonia  */
  const [allFlagsContainer, allFlagDimensions] = useFlagDimensions(9);

  const handleNextCountry = () => {
    setCurrentCountryIndex((prevIndex) => (prevIndex + 1) % countries.length);
  };

  const handlePreviousCountry = () => {
    setCurrentCountryIndex((prevIndex) =>
      prevIndex === 0 ? countries.length - 1 : prevIndex - 1
    );
  };

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
      <div className="w-full mt-10" ref={allFlagsContainer}>
        <motion.div
          layout="position"
          className="flex w-full gap-4 mt-10"
          style={{
            /* We set a minimum height, so that when there's no previous history, this region does not collapse */
            minHeight: allFlagDimensions.height + 80, // 80px for the text below the flags
          }}
        >
          <AnimatePresence>
            {allButLast.map((year) => (
              <motion.div
                key={year}
                className="flex flex-col gap-4 mt-4"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <Box
                  sx={{
                    width: allFlagDimensions.width,
                    height: allFlagDimensions.height,
                  }}
                >
                  <Flag
                    country={currentCountry}
                    year={year}
                    isTimeline
                    orientation="horizontal"
                    isInteractive={false}
                  />
                </Box>
                {dataCountry.find((d) => d.year === year)?.ranking !==
                undefined ? (
                  <div className="flex gap-2 ">
                    <h3 aria-hidden>
                      {year}
                      <span className="text-slate-400">{` | ${nth(
                        dataCountry.find((d) => d.year === year)
                          ?.ranking as number
                      )}`}</span>
                    </h3>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className={`flex mt-10 gap-4 visible`} ref={flagsContainer}>
        <div>
          <Box
            sx={{
              width: flagDimensions.width,
              height: flagDimensions.height,
            }}
          >
            <AnimatedFlag
              data={dataCountry.filter((d) => d.year === YEAR)}
              width={flagDimensions.width}
              height={flagDimensions.height}
            />
          </Box>
        </div>
        <div style={{ display: "inline-block", alignSelf: "flex-end" }}>
          {CATEGORIES_ORDERED_LIST.map((category) => {
            let color = colorScale(category);
            while (!colord(color).isReadable("#1E293B")) {
              color = colord(color).lighten(0.05).toHex();
            }

            return (
              <p
                key={category}
                style={{
                  color: color,
                }}
              >
                <span className="font-semibold tabular-nums ">
                  {format(".0%")(data[currentCountryIndex][category])}
                </span>
                &nbsp;
                {CATEGORIES_FULL_NAME[category]}
              </p>
            );
          })}
        </div>
      </div>
      <div
        className="flex mt-4 text-4xl font-medium gap-14"
        style={{ width: flagDimensions.width, justifyContent: "space-between" }}
      >
        <h2 tabIndex={0}>
          {currentCountry}{" "}
          <span className="text-slate-400">{` | ${nth(
            dataCountry.find((d) => d.year === YEAR)?.ranking as number
          )}`}</span>
        </h2>
        []
        <div className="flex gap-2 text-slate-400">
          <OutlineButton
            onClick={handlePreviousCountry}
            variant="outlined"
            size="small"
            aria-label="Previous country"
          >
            <ArrowCircleLeftOutlinedIcon />
          </OutlineButton>
          <OutlineButton
            onClick={() => setIsRunning(!isRunning)}
            variant="outlined"
            size="small"
            aria-label={isRunning ? "Pause animation" : "Play animation"}
          >
            {isRunning ? (
              <PauseCircleOutlineIcon aria-hidden />
            ) : (
              <PlayCircleOutlineIcon aria-hidden />
            )}
          </OutlineButton>

          <OutlineButton
            onClick={handleNextCountry}
            variant="outlined"
            size="small"
            aria-label="Next country"
          >
            <ArrowCircleRightOutlinedIcon />
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

const AnimatedFlag = ({
  data,
  width,
  height,
}: {
  data: $FixMe[];
  width: number;
  height: number;
}) => {
  const stripeScale = scaleLinear({
    domain: [0, 6], // 6 stripes in the flag
    range: [height, 0],
  });
  const colorScale = scaleOrdinal({
    domain: CATEGORIES_ORDERED_LIST,
    range: RAINBOW_COLORS,
  });

  const stacks = d3Stack()
    .keys(CATEGORIES_ORDERED_LIST.slice().reverse())
    .value((d, key) => d[key])(data);

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        height={height}
        width={width}
        className="fill-slate-900"
      />
      {CATEGORIES_ORDERED_LIST.slice()
        .reverse()
        .map((category, index) => {
          const stack = stacks[index];
          const bar = stack[0];
          return (
            <motion.rect
              key={category}
              width={width}
              initial={{
                fillOpacity: 0.9,
                height: stripeScale(bar[0]) - stripeScale(bar[1]),
                x: 0,
                y: stripeScale(bar[1]),
              }}
              animate={{
                fill: colorScale(category),
                height: stripeScale(bar[0]) - stripeScale(bar[1]),
                x: 0,
                y: stripeScale(bar[1]),
              }}
              transition={{
                type: "tween",
              }}
              height={stripeScale(bar[0]) - stripeScale(bar[1])}
              whileFocus={{
                stroke: colord(colorScale(category)).darken(0.25).toHex(),
                strokeWidth: 3,
                strokeLinecap: "square",
                transition: { duration: 0.5 },
              }}
              style={{ outline: "none" }}
              aria-label={
                category + " " + Math.round(data[0][category] * 100) + "%"
              }
            />
          );
        })}
      <rect
        x={0}
        y={0}
        height={height}
        width={width}
        className="stroke-slate-300 fill-transparent"
      />
    </svg>
  );
};

export default CountryNavigator;
