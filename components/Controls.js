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
    setSortDict({ type: "hate", ascending: !orderRanking });
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={0}
      my={4}
      className="justify-center w-full mx-auto md:w-11/12 xl:justify-between"
    >
      <Stack direction="row" flexWrap="wrap">
        <SortButton
          className="w-full my-1 lg:w-fit"
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
          className="w-full my-1 lg:w-fit lg:ml-4"
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
      </Stack>
      <Box className="w-full lg:w-1/2 xl:w-1/3">
        <YearsSlider
          min={2015}
          value={year}
          max={2022}
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
  );
}
