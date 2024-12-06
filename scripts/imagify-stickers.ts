import { getData } from "../data";
import * as d3 from "d3";
import {
  CATEGORIES_FULL_NAME,
  CATEGORIES_ORDERED_LIST,
  RAINBOW_COLORS,
} from "../constants";
import { JSDOM } from "jsdom";
// @ts-expect-error weird error even with esModuleInterop set to true
import sharp from "sharp";
import { nth } from "../utils";
import { format } from "d3";

const data2024 = getData({
  years: [2024],
});

const WIDTH = 1750;
const HEIGHT = 1250;
const MARGIN = {
  top: 150,
  right: 150,
  bottom: 250,
  left: 150,
};
const FLAG_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
const FLAG_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;

const stripeScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, FLAG_HEIGHT / 6]);

const colorScale = d3
  .scaleOrdinal()
  .domain(CATEGORIES_ORDERED_LIST)
  .range(RAINBOW_COLORS);

const renderChart = async (data) => {
  const dom = new JSDOM(
    '<!DOCTYPE html><body><svg id="flag"></svg></body></html>'
  );

  const svgElement = dom.window.document.getElementById("flag");
  const svg = d3.select(svgElement);

  svg.attr("width", `${WIDTH}px`).attr("height", `${HEIGHT}px`);

  svg
    .append("rect")
    .attr("width", `${WIDTH}px`)
    .attr("height", `${HEIGHT}px`)
    .attr("fill", "#1E293B");

  svg
    .append("rect")
    .attr("width", FLAG_WIDTH)
    .attr("height", FLAG_HEIGHT)
    .attr("x", MARGIN.left)
    .attr("y", MARGIN.top)
    .attr("fill", "#0f172a");

  let pos = MARGIN.top + FLAG_HEIGHT;
  [...CATEGORIES_ORDERED_LIST].reverse().forEach((category) => {
    svg
      .append("rect")
      .attr("width", FLAG_WIDTH)
      .attr("height", stripeScale(data[category]))
      .attr("x", MARGIN.left)
      .attr("y", pos - stripeScale(data[category]))
      .attr("fill", colorScale(category) as string);
    pos -= stripeScale(data[category]);
  });

  svg
    .append("rect")
    .attr("width", FLAG_WIDTH)
    .attr("height", FLAG_HEIGHT)
    .attr("x", MARGIN.left)
    .attr("y", MARGIN.top)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", "#cbd5e1");

  const countryLabel = svg
    .append("text")
    .attr("id", "label")
    .attr("x", MARGIN.left)
    .attr("y", MARGIN.top + FLAG_HEIGHT + 100)
    .attr("fill", "rgb(248, 250, 252)")
    .style("font-size", "72px")
    .style("font-weight", "500")
    .style(
      "font-family",
      "ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji"
    )
    .text(data.country);

  countryLabel
    .append("tspan")
    .text(`| ${nth(data.ranking)}`)
    .attr("fill", "rgb(148, 163, 184)")
    .attr("dx", 20);

  const svgAsText = svgElement.outerHTML;

  const svgImageBuffer = Buffer.from(svgAsText);
  await sharp(svgImageBuffer)
    .png()
    .toFile(`stickers/${data.country}_front.png`);
};

const renderAnnotation = async (data) => {
  const dom = new JSDOM(
    '<!DOCTYPE html><body><svg id="annotations"></svg></body></html>'
  );

  const svgElement = dom.window.document.getElementById("annotations");
  const svg = d3.select(svgElement);

  svg.attr("width", `${WIDTH}px`).attr("height", `${HEIGHT}px`);

  svg
    .append("text")
    .attr("x", MARGIN.left)
    .attr("y", MARGIN.top)
    .attr("fill", "white")
    .style("font-size", "42px")
    .style("font-weight", "500")
    .style(
      "font-family",
      "ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji"
    )
    .selectAll("tspan")
    .data([...CATEGORIES_ORDERED_LIST])
    .join("tspan")
    .attr("dy", "1.2em")
    .attr("x", MARGIN.left)
    .text((d) => `${CATEGORIES_FULL_NAME[d]}: ${format(".0%")(data[d])}`)
    .attr("fill", (d) => colorScale(d) as string);

  const svgAsText = svgElement.outerHTML;

  const svgImageBuffer = Buffer.from(svgAsText);
  await sharp(svgImageBuffer).png().toFile(`stickers/${data.country}_back.png`);
};

data2024.forEach((d) => {
  renderChart(d);
  renderAnnotation(d);
});

renderChart({
  country: "Full",
  ...CATEGORIES_ORDERED_LIST.reduce((acc, category) => {
    acc[category] = 1;
    return acc;
  }, {}),
});
