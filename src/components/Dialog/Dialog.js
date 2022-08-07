import Box from "@mui/material/Box";
import DialogMUI from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useMemo } from "react";
import Stack from "@mui/material/Stack";

import { getData } from "../../data";
import { useFlagDimensions } from "../../hooks/useFlagDimensions";
import { Flag } from "../Flag";

export default function Dialog({ open, country, onClose, isSmallScreen }) {
  return (
    <DialogMUI open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle id="alert-dialog-title">{country}</DialogTitle>
      <DialogContent>
        {open && <Timeline country={country} isVertical={isSmallScreen} />}
      </DialogContent>
    </DialogMUI>
  );
}

const Timeline = ({ country, isVertical }) => {
  const data = useMemo(() => getData({ countries: [country] }), [country]);
  const years = data.map((d) => d.year).sort();
  const [flagsContainer, flagDimensions] = useFlagDimensions(
    isVertical ? 1 : years.length
  );

  return (
    <div
      className={`flex ${isVertical ? "flex-col" : "flex-row"}  w-10/12 gap-4`}
      ref={flagsContainer}
    >
      {years.map((year) => (
        <div
          key={`${country}-${year}`}
          className={`flex ${
            isVertical ? "flex-row-reverse" : "flex-col"
          } gap-4`}
          style={isVertical ? { marginTop: "20%" } : {}}
        >
          <Box
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
  );
};
