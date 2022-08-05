import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Group } from "@visx/group";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import React, { useMemo, useState } from "react";
import { sort, descending, ascending } from "d3-array";

import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../../constants";
import { getData } from "../../data";
import Flag from "../singleCountry/flag";

export default function AllFlags({
  year,
  orderRanking,
  orderAlphabetical,
  sortDict,
}) {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const data = useMemo(() => getData({ years: [year] }), [year]);

  const orderedData = data
    .slice()
    .sort((a, b) =>
      sortDict.ascending == true
        ? ascending(a[sortDict.type], b[sortDict.type])
        : descending(a[sortDict.type], b[sortDict.type])
    );

  const getYear = (d) => d.year;

  const width_ = window.screen.width / 7;
  const height_ = width_ / 2;

  const colorScale = scaleOrdinal({
    domain: CATEGORIES_ORDERED_LIST,
    range: RAINBOW_COLORS,
  });
  const rankingScale = scaleLinear({
    domain: [0, 6],
    range: [height_, 0],
  });
  const widthScale = scaleLinear({
    domain: [0, 700],
    nice: true,
  });

  return (
    <div>
      {orderedData.map((year, index) => (
        <div key={index} style={{ display: "inline-block" }}>
          <Button
            onClick={() => {
              setOpen(true);
              setCountry(year.country);
            }}
          >
            <svg width={width_} height={height_}>
              <Group>
                <BarStack
                  data={[year]}
                  keys={CATEGORIES_ORDERED_LIST}
                  x={getYear}
                  xScale={widthScale}
                  yScale={rankingScale}
                  color={colorScale}
                >
                  {(barStacks) =>
                    barStacks.map((barStack) =>
                      barStack.bars.map((bar) => (
                        <rect
                          key={`bar-stack-${barStack.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          height={bar.height}
                          width={width_}
                          fill={bar.color}
                        />
                      ))
                    )
                  }
                </BarStack>
              </Group>
            </svg>
          </Button>
          <p>{year.country}</p>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <DialogTitle id="alert-dialog-title">{country}</DialogTitle>
        <DialogContent>
          <Flag country={country}></Flag>
        </DialogContent>
      </Dialog>
    </div>
  );
}
