import { getData } from "../data";
import * as d3 from "d3";
import {
  CATEGORIES_ORDERED_LIST,
  RAINBOW_COLORS,
  RAINBOW_COLORS_CLASSIC,
} from "../constants";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const sharp = require("sharp");

const data2024 = getData({
  years: [2024],
});

const WIDTH = 700;
const HEIGHT = 400;

const stripeScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, HEIGHT / 6]);

const colorScale = d3
  .scaleOrdinal()
  .domain(CATEGORIES_ORDERED_LIST)
  .range(RAINBOW_COLORS_CLASSIC);

const dom = new JSDOM(
  '<!DOCTYPE html><body><svg id="flag"></svg></body></html>'
);


