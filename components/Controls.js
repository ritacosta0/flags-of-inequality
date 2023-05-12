import React, { useState, useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MouseIcon from "@mui/icons-material/Mouse";
import Stack from "@mui/material/Stack";

import { yearsList } from "../data";
import { range } from "lodash";
import { styled } from "@mui/material/styles";
import { max, min } from "d3-array";

const YearsSlider = styled(Slider)(({ theme }) => ({
  color: "#cbd5e1",
  height: 4,
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    backgroundColor: "#cbd5e1",
    border: "1px solid currentColor",
    padding: "1px",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "#94a3b8",
    transform: "translateX(-90%)",
    fontSize: "0.65rem",
    "@media (min-width: 768px)": {
      fontSize: "0.875rem",
    },
  },
  "& .MuiSlider-markLabelActive": {
    color: "#f1f5f9",
  },
}));

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

export default function Controls({
  year,
  setYear,
  setOrderRanking,
  setOrderAlphabetical,
  orderRanking,
  orderAlphabetical,
  setSortDict,
}) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    setIsLargeScreen(window.innerWidth > 700);
  }, []);

  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const handleClickAlphabetical = () => {
    setOrderAlphabetical(!orderAlphabetical);
    setSortDict({ type: "country", ascending: !orderAlphabetical });
  };
  const handleClickRanking = () => {
    setOrderRanking(!orderRanking);
    setSortDict({ type: "ranking", ascending: !orderRanking });
  };

  return (
    <div className="w-full mx-auto mt-6 mb-10 md:w-11/12">
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={0}
        my={4}
        className="justify-center xl:justify-between"
      >
        <div className="flex flex-row flex-wrap gap-1 lg:gap-2">
          <SortButton
            aria-label={`Sort by global ranking in ${
              !orderRanking ? "ascending" : "descending"
            } order.`}
            className="w-full py-2 my-1 text-left lg:w-fit h-fit"
            onClick={handleClickRanking}
            variant="outlined"
            size="small"
            startIcon={
              <>
                <SortIcon />
                {orderRanking ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </>
            }
          >
            Sort by global ranking
          </SortButton>
          <SortButton
            aria-label={`Sort alphabetically in ${
              !orderAlphabetical ? "ascending" : "descending"
            } order.`}
            className="w-full py-2 my-1 text-left lg:w-fit lg:ml-4 h-fit"
            onClick={handleClickAlphabetical}
            variant="outlined"
            size="small"
            startIcon={
              <>
                <SortByAlphaIcon />
                {orderAlphabetical ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}{" "}
              </>
            }
          >
            Sort alphabetically
          </SortButton>
        </div>
        <Box className="w-full lg:w-1/2 xl:w-1/3">
          <YearsSlider
            aria-label={`Use this slider to select a year from 2015 to 2023 to explore.`}
            getAriaValueText={() => year}
            min={2015}
            value={year}
            max={2023}
            step={1}
            track={false}
            marks={yearsList.sort().map((value) => ({
              value,
              label:
                isLargeScreen ||
                [min(yearsList), max(yearsList), year].includes(value)
                  ? value
                  : null,
            }))}
            onChange={handleChange}
          />
        </Box>
      </Stack>
      <div
        className="flex flex-col items-center justify-center gap-2 -mt-6 text-xs align-middle md:flex-row xl:justify-end text-slate-400 "
        aria-hidden
      >
        Use the slider to select a year and
        <div className="flex items-center gap-2">
          <MouseIcon fontSize="small" />
          click on a flag to see how it has changed over the years.
        </div>
      </div>
    </div>
  );
}
