import { getData } from "../data";
import * as d3 from "d3";
import {
  CATEGORIES,
  CATEGORIES_ORDERED_LIST,
  RAINBOW_COLORS,
  RAINBOW_COLORS_CLASSIC,
} from "../constants";
import { useEffect } from "react";
import { Group } from "@visx/group";
import { BarStack } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";

const data2024 = getData({
  years: [2024],
});

const WIDTH = 350;
const HEIGHT = 200;
const MARGIN = 20;

const stripeScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, HEIGHT / 6]);

const colorScale = d3
  .scaleOrdinal()
  .domain(CATEGORIES_ORDERED_LIST)
  .range(RAINBOW_COLORS_CLASSIC);

function Expo() {
  useEffect(() => {
    data2024.forEach((d) => {
      renderFlag(`flag-${d.country}`, d);
    });
  }, []);
  return (
    <div className="absolute top-0 left-0 w-screen px-32 bg-white">
      <div className="flex flex-row flex-wrap justify-between py-10 gap-x-10 gap-y-20">
        {data2024.map((d, i) => {
          return (
            <div key={i}>
              <h2 className="my-2 font-semibold text-black ">{d.country}</h2>
              <svg id={`flag-${d.country}`} className="overflow-visible " />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const toCM = (px) => Math.round(((px * 40) / HEIGHT) * 100) / 100;

export default Expo;

const renderFlag = (id, data) => {
  const element = document.getElementById(id);
  const svg = d3.select(element);

  const totalHeight = CATEGORIES_ORDERED_LIST.reduce(
    (acc, category) => acc + stripeScale(data[category]),
    0
  );

  svg.attr("width", `${WIDTH}px`).attr("height", `${HEIGHT}px`);

  let pos = HEIGHT;

  svg
    .append("rect")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("fill", "white")
    .attr("stroke", "black");

  const firstStripe = [...CATEGORIES_ORDERED_LIST].find((category) => {
    return data[category] > 0;
  });

  const lastStripe = [...CATEGORIES_ORDERED_LIST].reverse().find((category) => {
    return data[category] > 0;
  });

  [...CATEGORIES_ORDERED_LIST].reverse().forEach((category) => {
    svg
      .append("rect")
      .attr("width", WIDTH)
      .attr("height", stripeScale(data[category]))
      .attr("y", pos - stripeScale(data[category]))
      .attr("fill", colorScale(category));

    if (category === firstStripe) {
      svg
        .append("text")
        .attr("x", 24)
        .attr("y", pos - stripeScale(data[category]) - 10)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12")
        .attr("fill", colorScale(category))
        .text(`${toCM(stripeScale(data[category]))}cm`);
    }
    if (category === lastStripe) {
      svg
        .append("text")
        .attr("x", 24)
        .attr("y", HEIGHT + 10)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12")
        .attr("fill", colorScale(category))
        .text(`${toCM(stripeScale(data[category]))}cm`);
    }
    pos -= stripeScale(data[category]);
  });

  svg
    .append("line")
    .attr("x1", WIDTH + 10)
    .attr("y1", HEIGHT - totalHeight)
    .attr("x2", WIDTH + 10)
    .attr("y2", HEIGHT)
    .attr("stroke", "black");

  svg
    .append("line")
    .attr("x1", WIDTH + 5)
    .attr("y1", HEIGHT - totalHeight)
    .attr("x2", WIDTH + 10)
    .attr("y2", HEIGHT - totalHeight)
    .attr("stroke", "black");

  svg
    .append("line")
    .attr("x1", WIDTH + 5)
    .attr("y1", HEIGHT)
    .attr("x2", WIDTH + 10)
    .attr("y2", HEIGHT)
    .attr("stroke", "black");

  const heightInCm = Math.round(((totalHeight * 40) / HEIGHT) * 100) / 100;
  svg
    .append("text")
    .attr("x", WIDTH + 20)
    .attr("y", HEIGHT - totalHeight / 2)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12")
    .text(heightInCm + "cm");

  svg
    .append("line")
    .attr("x1", WIDTH + 10)
    .attr("y1", 0)
    .attr("x2", WIDTH + 10)
    .attr("y2", HEIGHT - totalHeight)
    .attr("stroke", "black");

  svg
    .append("line")
    .attr("x1", WIDTH + 5)
    .attr("y1", 0)
    .attr("x2", WIDTH + 10)
    .attr("y2", 0)
    .attr("stroke", "gray");

  svg
    .append("text")
    .attr("x", WIDTH + 20)
    .attr("y", (HEIGHT - totalHeight) / 2)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12")
    .text(
      `${Math.round((((HEIGHT - totalHeight) * 40) / HEIGHT) * 100) / 100}cm`
    );

  svg
    .append("line")
    .attr("x1", 0)
    .attr("y1", HEIGHT + 20)
    .attr("x2", WIDTH)
    .attr("y2", HEIGHT + 20)
    .attr("stroke", "gray");

  svg
    .append("text")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 30)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12")
    .attr("fill", "gray")
    .text("70cm");

  svg
    .append("line")
    .attr("x1", -20)
    .attr("y1", 0)
    .attr("x2", -20)
    .attr("y2", HEIGHT)
    .attr("stroke", "gray");

  svg
    .append("text")
    .attr("x", -25)
    .attr("y", HEIGHT / 2)
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12")
    .attr("fill", "gray")
    .text("40cm");
};
