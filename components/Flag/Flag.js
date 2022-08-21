import Tippy from "@tippyjs/react";
import { Group } from "@visx/group";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarStack, Line } from "@visx/shape";
import { motion } from "framer-motion";
import { isNull } from "lodash";
import React, { useMemo, useState } from "react";

import "tippy.js/animations/shift-away.css";

import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../../constants";
import { getData } from "../../data";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import Annotation from "./Annotation";

export default function Flag({ country, year, isInteractive = true }) {
  const [chartWrapper, dimensions] = useChartDimensions({ marginBottom: 0 });
  const [hoveredStripe, setHoveredStripe] = useState(null);

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
        domain: [0, 6], // 6 stripes in the flag
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
    <div ref={chartWrapper} style={{ width: "100%", height: "100%" }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
          <rect
            x={0}
            y={0}
            height={dimensions.boundedHeight}
            width={dimensions.boundedWidth}
            className="fill-slate-900"
          />

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
                stack.bars.map((bar, index) => (
                  <Tippy
                    key={index}
                    offset={[0, -45]}
                    placement="right"
                    animation="shift-away"
                    duration={100}
                    content={
                      isInteractive ? (
                        <Annotation
                          color={colorScale(bar.key)}
                          value={data[0][bar.key]}
                        />
                      ) : null
                    }
                  >
                    <motion.rect
                      x={0}
                      y={bar.y}
                      height={bar.height}
                      width={dimensions.boundedWidth}
                      initial={{
                        fillOpacity: 1,
                      }}
                      animate={{
                        fill: bar.color,
                        fillOpacity:
                          bar.key === hoveredStripe ||
                          isNull(hoveredStripe) ||
                          !isInteractive
                            ? 1
                            : 0.7,
                      }}
                      onMouseEnter={() => setHoveredStripe(bar.key)}
                      onMouseLeave={() => setHoveredStripe(null)}
                      className={isInteractive ? "cursor-pointer" : ""}
                    />
                  </Tippy>
                ))
              )
            }
          </BarStack>
          <Line
            from={{ x: 0, y: 0 }}
            to={{ x: 0, y: dimensions.boundedHeight }}
            className=" stroke-slate-300"
          />
          <Line
            from={{ x: 0, y: dimensions.boundedHeight }}
            to={{ x: dimensions.boundedWidth, y: dimensions.boundedHeight }}
            className=" stroke-slate-300"
          />
          <Line
            from={{ x: dimensions.boundedWidth, y: dimensions.boundedHeight }}
            to={{ x: dimensions.boundedWidth, y: 0 }}
            className=" stroke-slate-300"
          />
          <Line
            from={{ x: dimensions.boundedWidth, y: 0 }}
            to={{ x: 0, y: 0 }}
            className=" stroke-slate-300"
          />
        </Group>
      </svg>
    </div>
  );
}
