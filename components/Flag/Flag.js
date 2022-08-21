import React, { useMemo, useRef, useState } from "react";
import { Group } from "@visx/group";
import { BarStack, Line } from "@visx/shape";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { localPoint } from "@visx/event";
import { motion } from "framer-motion";

import { getData } from "../../data";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../../constants";
import Annotation from "./Annotation";
import { isNull } from "lodash";

export default function Flag({
  country,
  year,
  isTimeline,
  isInteractive = true,
}) {
  const [chartWrapper, dimensions] = useChartDimensions({ marginBottom: 0 });
  const [pointerPosition, setPointerPosition] = useState(null);
  const [hoveredStripe, setHoveredStripe] = useState(null);
  const svgRef = useRef();

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
        domain: [0, 6], // 7 stripes in the flag
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

  const flagDescription =
    isTimeline == "true"
      ? `In ${data[0].year}, the coverage of LGBTQ+ rights is at ${Math.round(
          (data[0].asylum +
            data[0].civil +
            data[0].equality +
            data[0].family +
            data[0].gender +
            data[0].hate +
            (data[0].year == 2022 ? data[0].intersex : 0)) *
            100
        )} out of 600 possible points.`
      : `${data[0].country}. The coverage of LGBTQ+ rights is at ${Math.round(
          (data[0].asylum +
            data[0].civil +
            data[0].equality +
            data[0].family +
            data[0].gender +
            data[0].hate +
            (data[0].year == 2022 ? data[0].intersex : 0)) *
            100
        )} out of 600 possible points.`;

  return (
    <div ref={chartWrapper} style={{ width: "100%", height: "100%" }}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        ref={svgRef}
        tabIndex={0}
        aria-label={flagDescription}
        role={"button"}
      >
        <Group
          top={dimensions.marginTop}
          left={dimensions.marginLeft}
          onMouseMove={(event) =>
            setPointerPosition(localPoint(svgRef.current, event))
          }
        >
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
                  <motion.rect
                    key={index}
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
                    aria-label={bar.key + " " + data[0][hoveredStripe]}
                  />
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
          {isInteractive && hoveredStripe && pointerPosition && (
            <Annotation
              dimensions={dimensions}
              pointerPosition={pointerPosition}
              value={data[0][hoveredStripe]}
              label={hoveredStripe}
              color={colorScale(hoveredStripe)}
            />
          )}
        </Group>
      </svg>
    </div>
  );
}
