import { Group } from "@visx/group";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack } from "@visx/shape";
import React, { useMemo } from "react";

import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../../constants";
import { getData } from "../../data";

export default function Flag(props) {
  const data = useMemo(
    () =>
      getData({
        countries: [props.country],
        years: [2021, 2022],
        CATEGORIES_ORDERED_LIST,
      }),
    [props.country]
  );
  const getCountry = (d) => d.country;

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data.map((country, index) => (
        <div key={index}>
          <svg style={{ paddingLeft: "5px" }} width={width_} height={height_}>
            <Group>
              <BarStack
                data={[country]}
                keys={CATEGORIES_ORDERED_LIST}
                x={getCountry}
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
          <p>{country.year}</p>
        </div>
      ))}
    </div>
  );
}
