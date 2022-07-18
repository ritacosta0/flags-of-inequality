import data2015 from "./rainbow_2015_with_percentages.json";
import data2016 from "./rainbow_2016_with_percentages.json";
import data2017 from "./rainbow_2017_with_percentages.json";
import data2018 from "./rainbow_2018_with_percentages.json";
import data2019 from "./rainbow_2019_with_percentages.json";
import data2020 from "./rainbow_2020_with_percentages.json";
import data2021 from "./rainbow_2021_with_percentages.json";
import data2022 from "./rainbow_2022_with_percentages.json";
import { CATEGORIES } from "../constants";

import {
  groupBy,
  pivotWider,
  summarize,
  tidy,
  first,
  mutate,
  select,
  filter,
} from "@tidyjs/tidy";
import { isUndefined } from "lodash";

export const categoryLabels = {
  [CATEGORIES.EQUALITY]: [
    "Equality and non-discrimination ",
    "Equality & non-discrimination ",
  ],
  [CATEGORIES.FAMILY]: ["Family "],
  [CATEGORIES.HATE]: ["Hate crime & hate speech "],
  [CATEGORIES.GENDER]: [
    "Legal gender recognition & bodily integrity ",
    "Legal gender recognition ",
  ],
  [CATEGORIES.INTERSEX]: ["Intersex bodily integrity "],
  [CATEGORIES.CIVIL]: [
    "Civil society space ",
    "Freedom of assembly, association & expression ",
  ],
  [CATEGORIES.ASYLUM]: ["Asylum "],
};

export const standardCategory = (category) => {
  for (let categoryType in categoryLabels) {
    if (categoryLabels[categoryType].includes(category)) {
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
];

const wideData = tidy(
  data,
  groupBy(
    ["country", "year", "category"],
    summarize({
      value: first("category_percentage"),
    })
  ),
  mutate({
    category: (d) => standardCategory(d.category),
  }),
  pivotWider({
    namesFrom: "category",
    valuesFrom: "value",
  })
);

const filterContext = (datum, countries, years) => {
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
export const getData = ({ countries, years, keys }) => {
  const filteredData = wideData.filter((d) =>
    filterContext(d, countries, years)
  );
  if (isUndefined(keys)) return filteredData;

  return tidy(filteredData, select(["country", "year", ...keys]));
};

export const getCategoryDetailData = ({ countries, years, category }) => {
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

const getUniqueValues = (dataset, accessor) =>
  [...new Set(dataset.map(accessor))].sort();

export const yearsList = getUniqueValues(wideData, (d) => d.year);
export const countriesList = getUniqueValues(wideData, (d) => d.country);
