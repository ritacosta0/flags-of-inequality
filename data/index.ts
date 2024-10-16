import data2015 from "./rainbow_2015_with_percentages.json";
import data2016 from "./rainbow_2016_with_percentages.json";
import data2017 from "./rainbow_2017_with_percentages.json";
import data2018 from "./rainbow_2018_with_percentages.json";
import data2019 from "./rainbow_2019_with_percentages.json";
import data2020 from "./rainbow_2020_with_percentages.json";
import data2021 from "./rainbow_2021_with_percentages.json";
import data2022 from "./rainbow_2022_with_percentages.json";
import data2023 from "./rainbow_2023_with_percentages.json";
import data2024 from "./rainbow_2024_with_percentages.json";

import { ascending, descending } from "d3-array";
import { CATEGORIES } from "../constants";

import { $FixMe } from "@/utils/defs";
import {
  filter,
  first,
  groupBy,
  mutate,
  pivotWider,
  select,
  summarize,
  tidy,
} from "@tidyjs/tidy";
import { isUndefined } from "lodash";

export const categoryLabels: Record<Category, string[]> = {
  equality: [
    "Equality and non-discrimination ",
    "Equality & non-discrimination ",
    "Equality & non-discrimination",
  ],
  family: ["Family ", "Family"],
  hate: ["Hate crime & hate speech ", "Hate crime & hate speech"],
  gender: [
    "Legal gender recognition & bodily integrity ",
    "Legal gender recognition ",
    "Legal gender recognition",
  ],
  intersex: ["Intersex bodily integrity ", "Intersex bodily integrity"],
  civil: [
    "Civil society space ",
    "Civil society space",
    "Freedom of assembly, association & expression ",
  ],
  asylum: ["Asylum ", "Asylum"],
};

export const standardCategory = (category: string) => {
  for (const categoryType in categoryLabels) {
    if (categoryLabels[categoryType as Category].includes(category)) {
      return categoryType;
    }
  }
  return null;
};

export const data = [
  ...data2015,
  ...data2016,
  ...data2017,
  ...data2018,
  ...data2019,
  ...data2020,
  ...data2021,
  ...data2022,
  ...data2023,
  ...data2024,
];

export type CategoryKey = keyof typeof CATEGORIES;
export type Category = (typeof CATEGORIES)[CategoryKey];

export type Datum = {
  country: string;
  year: number;
  url: string;
  ranking: number;
} & Record<Category, number>;

const wideData = tidy(
  data,
  groupBy(
    ["country", "year", "category"],
    summarize({
      value: first("category_percentage"),
      ranking: first("ranking"),
      url: first("url"),
    })
  ),
  mutate({
    category: (d) => standardCategory(d.category),
    // Czech Republic is now Czechia, we need this to match data prev to 2023 with data from 2023 onwards for this country.
    country: (d) => (d.country === "Czech Republic" ? "Czechia" : d.country),
  }),
  pivotWider({
    namesFrom: "category",
    valuesFrom: "value",
  }),
  mutate({
    gender: (d) =>
      !isUndefined(d.intersex)
        ? // there are 4 intersex requirements and 13 gender requirements, 17 in total
          Math.round(d.intersex * (4 / 17) + d.gender * (13 / 17) * 100) / 100
        : d.gender,
  }),
  select(["-intersex"])
) as Datum[];

const filterContext = (
  datum: $FixMe,
  countries?: string[],
  years?: number[]
) => {
  const conditions = [
    !countries || countries.includes(datum.country),
    !years || years.includes(datum.year),
  ];
  return conditions.every(Boolean);
};

/* 
Returns data based on input filter { countries, years, keys }.
When no filter is passed, all values are returned. Examples: 
- getData({ countries: ["Portugal"]}) returns data for Portugal for all years and all categories. 
- getData({ years: [2022], keys: ["equality", "civil"]}) returns data for year 2022 and categories "equality", "civil"
for all countries.
- getData() returns full dataset.
 */
export const getData = ({
  countries,
  years,
  keys,
  sortingParams,
}: {
  countries?: string[];
  years?: number[];
  keys?: string[];
  sortingParams?: { type: keyof Datum; ascending: boolean };
}) => {
  let transformedData = wideData.filter((d) =>
    filterContext(d, countries, years)
  );
  if (!isUndefined(sortingParams)) {
    transformedData = transformedData.sort((a, b) =>
      sortingParams.ascending
        ? ascending(a[sortingParams.type], b[sortingParams.type])
        : descending(a[sortingParams.type], b[sortingParams.type])
    );
  }
  if (isUndefined(keys)) return transformedData;

  return tidy(transformedData, select(["country", "year", ...keys]));
};

export const getCategoryDetailData = ({
  countries,
  years,
  category,
}: {
  countries: string[];
  years: number[];
  category: string;
}) => {
  return tidy(
    data,
    filter(
      (d) =>
        filterContext(d, countries, years) &&
        standardCategory(d.category) === category
    ),
    mutate({
      categoryLabel: (d) => d.category,
      category: (d) => standardCategory(d.category),
    }),
    select(["-category_percentage"])
  );
};

const getUniqueValues = (dataset: $FixMe[], accessor: (d: $FixMe) => $FixMe) =>
  [...new Set(dataset.map(accessor))].sort();

export const yearsList = getUniqueValues(wideData, (d) => d.year);
export const countriesList = getUniqueValues(wideData, (d) => d.country);
