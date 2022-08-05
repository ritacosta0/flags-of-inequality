import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { BarStack } from "@visx/shape";
import { scaleLinear, scaleOrdinal } from "@visx/scale";

import { getData } from "../data";
import { useChartDimensions } from "../hooks/useChartDimensions";
import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../constants";

export default function Flag({ country, year }) {
  const [chartWrapper, dimensions] = useChartDimensions({});

  const data = useMemo(
    () =>
      getData({
        countries: [country],
        years: [year],
        CATEGORIES_ORDERED_LIST,
      }),
    [country, year]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, 7],
        range: [dimensions.boundedHeight, 0],
      }),
    [dimensions.boundedHeight]
  );

  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: [0, 1],
        range: [0, dimensions.boundedWidth],
      }),
    [dimensions.boundedWidth]
  );

  const colorScale = scaleOrdinal({
    domain: CATEGORIES_ORDERED_LIST,
    range: RAINBOW_COLORS,
  });

  return (
    <div ref={chartWrapper} style={{ height: 400 }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
          <BarStack
            data={data}
            keys={CATEGORIES_ORDERED_LIST}
            x={(d) => d.country}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(stacks) =>
              stacks.map((stack) =>
                stack.bars.map((bar) => (
                  <rect
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={dimensions.boundedWidth}
                    fill={bar.color}
                  />
                ))
              )
            }
          </BarStack>
        </Group>
      </svg>
    </div>
  );
}
