import Tippy from "@tippyjs/react";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { BarStack, BarStackHorizontal, Line } from "@visx/shape";
import { colord } from "colord";
import { motion } from "framer-motion";
import { isNull } from "lodash";
import React, { useMemo, useState } from "react";

import "tippy.js/animations/shift-away.css";

import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS } from "../../constants";
import { getData } from "../../data";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import Annotation from "./Annotation";

export default function Flag({
  country,
  year,
  isTimeline,
  isInteractive = true,
  orientation = "horizontal",
  isLastYear = "false",
}) {
  const [chartWrapper, dimensions] = useChartDimensions({ marginBottom: 0 });
  const [hoveredStripe, setHoveredStripe] = useState(null);

  const FlagStripeStack =
    orientation === "horizontal" ? BarStack : BarStackHorizontal;

  const data = useMemo(
    () =>
      getData({
        countries: [country],
        years: [year],
        CATEGORIES_ORDERED_LIST,
      }),
    [country, year]
  );

  const flagScale = scaleBand({
    domain: [data.map((d) => d.country)[0]],
    range: [
      0,
      orientation === "horizontal"
        ? dimensions.boundedWidth
        : dimensions.boundedHeight,
    ],
  });

  const stripeScale = scaleLinear({
    domain: [0, 6], // 6 stripes in the flag
    range:
      orientation === "horizontal"
        ? [dimensions.boundedHeight, 0]
        : [0, dimensions.boundedWidth],
  });

  const stackProps =
    orientation === "horizontal"
      ? {
          x: (d) => d.country,
          xScale: flagScale,
          yScale: stripeScale,
        }
      : {
          y: (d) => d.country,
          xScale: stripeScale,
          yScale: flagScale,
        };

  const colorScale = scaleOrdinal({
    domain: CATEGORIES_ORDERED_LIST,
    range: RAINBOW_COLORS,
  });
  const flagDescription =
    data[0] !== undefined
      ? isTimeline == "true"
        ? `In ${
            data[0].year
          }, the coverage of LGBTQ+ rights was at ${Math.round(
            (data[0].asylum +
              data[0].civil +
              data[0].equality +
              data[0].family +
              data[0].gender +
              data[0].hate) *
              100
          )} out of 600 possible points. ${
            data[0].ranking
          } in the global ranking. `
        : `${data[0].country}. ${
            data[0].ranking
          } in the global ranking. The coverage of LGBTQ+ rights is at ${Math.round(
            (data[0].asylum +
              data[0].civil +
              data[0].equality +
              data[0].family +
              data[0].gender +
              data[0].hate) *
              100
          )} out of 600 possible points.`
      : null;

  return data[0] !== undefined ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: "20px",
      }}
    >
      <div
        ref={chartWrapper}
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {dimensions.height > 0 && (
          <svg
            width={dimensions.width}
            height={dimensions.height}
            tabIndex={0}
            aria-label={flagDescription}
            role={"button"}
          >
            <Group top={dimensions.marginTop} left={dimensions.marginLeft}>
              <rect
                x={0}
                y={0}
                height={dimensions.boundedHeight}
                width={dimensions.boundedWidth}
                className="fill-slate-900"
              />

              <FlagStripeStack
                data={data}
                keys={CATEGORIES_ORDERED_LIST.slice().reverse()}
                color={colorScale}
                {...stackProps}
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
                          x={bar.x}
                          y={bar.y}
                          height={bar.height}
                          width={bar.width}
                          initial={{
                            fillOpacity: 0.9,
                          }}
                          animate={{
                            fill: bar.color,
                            stroke: null,
                            fillOpacity:
                              bar.key === hoveredStripe ||
                              isNull(hoveredStripe) ||
                              !isInteractive
                                ? 1
                                : 0.75,
                          }}
                          whileFocus={{
                            stroke: colord(bar.color).darken(0.25).toHex(),
                            strokeWidth: 3,
                            strokeLinecap: "square",
                            transition: { duration: 0.5 },
                          }}
                          style={{ outline: "none" }}
                          onMouseEnter={() => setHoveredStripe(bar.key)}
                          onMouseLeave={() => setHoveredStripe(null)}
                          className={`${isInteractive ? "cursor-pointer" : ""}`}
                          aria-label={
                            bar.key +
                            " " +
                            Math.round(data[0][bar.key] * 100) +
                            "%"
                          }
                        />
                      </Tippy>
                    ))
                  )
                }
              </FlagStripeStack>
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
                from={{
                  x: dimensions.boundedWidth,
                  y: dimensions.boundedHeight,
                }}
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
        )}
      </div>
    </div>
  ) : null;
}
