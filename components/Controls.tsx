import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MouseIcon from "@mui/icons-material/Mouse";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { create } from "zustand";

import { styled } from "@mui/material/styles";
import { max, min } from "d3-array";
import { yearsList } from "@/data";
import OutlineButton from "@/components/OutlineButton";

const YearsSlider = styled(Slider)(() => ({
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

type Sort = "ranking" | "alphabetical";
type Order = "ascending" | "descending";

type ControlsStore = {
  year: number;
  sort: {
    ranking: Order;
    alphabetical: Order;
  };
  selectedSort: Sort;
  actions: {
    setYear: (year: number) => void;
    setSort: (sort: Sort, order: Order) => void;
    setSelectedSort: (sort: Sort) => void;
  };
};

export const useControlsStore = create<ControlsStore>((set, get) => ({
  year: 2024,
  selectedSort: "ranking",
  sort: {
    ranking: "ascending",
    alphabetical: "ascending",
  },
  actions: {
    setYear: (year) => set({ year }),
    setSelectedSort: (selectedSort) => set({ selectedSort }),
    setSort: (sort, order) => {
      set({
        sort: {
          ...get().sort,
          [sort]: order,
        },
      });
    },
  },
}));

export default function Controls() {
  const { year, sort, selectedSort, actions } = useControlsStore();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    setIsLargeScreen(window.innerWidth > 700);
  }, []);

  const handleChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      actions.setYear(value);
    }
  };

  const handleClick = (clickSort: Sort) => {
    if (clickSort === selectedSort) {
      actions.setSort(
        clickSort,
        sort[clickSort] === "ascending" ? "descending" : "ascending"
      );
    } else {
      actions.setSelectedSort(clickSort);
    }
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
          <OutlineButton
            aria-label={`Sort by global ranking in ${sort["ranking"]} order.`}
            className="w-full py-2 my-1 text-left lg:w-fit h-fit"
            onClick={() => handleClick("ranking")}
            variant="outlined"
            size="small"
            startIcon={
              <>
                <SortIcon />
                {sort["ranking"] === "ascending" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </>
            }
          >
            Sort by global ranking
          </OutlineButton>
          <OutlineButton
            aria-label={`Sort alphabetically in ${sort["alphabetical"]} order.`}
            className="w-full py-2 my-1 text-left lg:w-fit lg:ml-4 h-fit"
            onClick={() => handleClick("alphabetical")}
            variant="outlined"
            size="small"
            startIcon={
              <>
                <SortByAlphaIcon />
                {sort["alphabetical"] === "ascending" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}{" "}
              </>
            }
          >
            Sort alphabetically
          </OutlineButton>
        </div>
        <Box className="w-full lg:w-1/2 xl:w-1/3">
          <YearsSlider
            aria-label={`Use this slider to select a year from 2015 to 2023 to explore.`}
            getAriaValueText={() => year.toString()}
            min={2015}
            value={year}
            max={2024}
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
