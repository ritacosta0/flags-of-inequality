import { yearFilter } from "../../utils/yearFilter";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
import flagsData from "../../data/rainbow.json";

export default function AllFlags(props) {
  const data = yearFilter(flagsData, props.year);
  const getYear = (d) => d.year;

  const width_ = window.screen.width / 7;
  const height_ = width_ / 2;

  const keys = [
    "asylum",
    "civil_space",
    "equality",
    "hate",
    "family",
    "gender_rec",
  ];
  const colors = [
    "#86007D",
    "#0000F9",
    "#008018",
    "#FFFF41",
    "#FFA52C",
    "#FF0018",
  ];

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors,
  });
  const rankingScale = scaleLinear({
    domain: [0, 600],
    range: [height_, 0],
  });
  const widthScale = scaleLinear({
    domain: [0, 700],
    nice: true,
  });

  return (
    <div>
      {data.map((year) => (
        <div style={{ display: "inline-block" }}>
          <p>{year.country}</p>
          <svg style={{ paddingLeft: "5px" }} width={width_} height={height_}>
            <Group>
              <BarStack
                data={[year]}
                keys={keys}
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
        </div>
      ))}
    </div>
  );
}
