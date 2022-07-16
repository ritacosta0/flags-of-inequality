import { countryFilter } from "../../utils/countryFilter";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleLinear, scaleOrdinal, scaleBand } from "@visx/scale";
import flagsData from "../../data/rainbow.json";

export default function Flag(props) {
  const data = countryFilter(flagsData, props.country);
  const getCountry = (d) => d.country;

  const width_ = window.screen.width * 0.3;
  const height_ = width_ * (3 / 4);

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data.map((country) => (
        <>
          {" "}
          <p>{country.year}</p>
          <svg
            style={{ paddingLeft: "5px" }}
            width={width_ + 10}
            height={height_ + 10}
          >
            <Group>
              <BarStack
                a={console.log(country)}
                data={[country]}
                keys={keys}
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
        </>
      ))}
    </div>
  );
}
