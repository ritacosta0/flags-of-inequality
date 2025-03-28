import { getData } from "../data";
import * as d3 from "d3";
import { CATEGORIES_ORDERED_LIST, RAINBOW_COLORS_CLASSIC } from "../constants";
import { JSDOM } from "jsdom";
// @ts-expect-error weird error even with esModuleInterop set to true
import sharp from "sharp";

const data2024 = getData({
  years: [2024],
});

const WIDTH = 2205;
const HEIGHT = 1260;

const stripeScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, HEIGHT / 6]);

const colorScale = d3
  .scaleOrdinal()
  .domain(CATEGORIES_ORDERED_LIST)
  .range(RAINBOW_COLORS_CLASSIC);

const renderChart = async (data) => {
  const dom = new JSDOM(
    '<!DOCTYPE html><body><svg id="flag"></svg></body></html>'
  );
  const svgElement = dom.window.document.getElementById("flag");
  const svg = d3.select(svgElement);

  const totalHeight = CATEGORIES_ORDERED_LIST.reduce(
    (acc, category) => acc + stripeScale(data[category]),
    0
  );

  svg.attr("width", `${WIDTH}px`).attr("height", `${totalHeight}px`);

  let pos = totalHeight;
  [...CATEGORIES_ORDERED_LIST].reverse().forEach((category) => {
    svg
      .append("rect")
      .attr("width", WIDTH)
      .attr("height", stripeScale(data[category]))
      .attr("y", pos - stripeScale(data[category]))
      .attr("fill", colorScale(category) as string);
    pos -= stripeScale(data[category]);
  });
  const svgAsText = svgElement.outerHTML;
  const heightInCm = Math.round(((totalHeight * 40) / 1260) * 100) / 100;
  //fs.writeFileSync(`images/${data.country}.svg`, svgAsText);

  const svgImageBuffer = Buffer.from(svgAsText);
  await sharp(svgImageBuffer)
    .png()
    .toFile(`flag-expo/images/${data.country}_${heightInCm}cm.png`);
};

data2024.forEach((d) => {
  renderChart(d);
});

renderChart({
  country: "Full",
  ...CATEGORIES_ORDERED_LIST.reduce((acc, category) => {
    acc[category] = 1;
    return acc;
  }, {}),
});
