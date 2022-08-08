import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import { flag } from "country-emoji";

import Flag from "../Flag/Flag";
import { getData } from "../../data";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { Dialog } from "../Dialog";

export default function AllFlags({ year, sortDict }) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const [flagsContainer, flagDimensions] = useFlagDimensions();
  const isSmallScreen =
    flagsContainer.current && flagsContainer.current.clientWidth < 400;

  const handleClose = () => {
    setOpen(false);
  };

  const data = useMemo(
    () => getData({ years: [year], sortingParams: sortDict }),
    [year, sortDict]
  );

  const countries = data.map((d) => d.country);

  return (
    <div
      className="flex flex-row flex-wrap justify-center gap-4"
      ref={flagsContainer}
    >
      {countries.map((country, index) => {
        return (
          <div key={index} className="mt-4">
            <Box
              onClick={() => {
                setOpen(true);
                setCountry(country);
              }}
              sx={{
                ...flagDimensions,
                cursor: "pointer",
              }}
            >
              <Flag country={country} year={year} />
            </Box>
            <h3 className="font-medium text-slate-800">{`${
              flag(country) || ""
            } ${country}`}</h3>
          </div>
        );
      })}
      <Dialog
        country={country}
        open={open}
        onClose={handleClose}
        isSmallScreen={isSmallScreen}
      />
    </div>
  );
}
