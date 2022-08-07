import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import Flag from "../Flag/Flag";

import { getData } from "../../data";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { Dialog } from "../Dialog";
import { useMediaQuery } from "@mui/material";

export default function AllFlags({ year, sortDict }) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(null);
  const [flagsContainer, flagDimensions] = useFlagDimensions();
  const isSmallScreen =
    flagsContainer.current && flagsContainer.current.clientWidth < 400;

  console.log(isSmallScreen);

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
          <div key={index}>
            <Button
              onClick={() => {
                setOpen(true);
                setCountry(country);
              }}
            >
              <Box
                sx={{
                  ...flagDimensions,
                }}
              >
                <Flag country={country} year={year} />
              </Box>
            </Button>
            <p>{country}</p>
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
