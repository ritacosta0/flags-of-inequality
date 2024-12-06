export const CATEGORIES = {
  EQUALITY: "equality",
  FAMILY: "family",
  HATE: "hate",
  CIVIL: "civil",
  GENDER: "gender",
  ASYLUM: "asylum",
  INTERSEX: "intersex",
} as const;

export const CATEGORIES_ORDERED_LIST = [
  CATEGORIES.EQUALITY,
  CATEGORIES.FAMILY,
  CATEGORIES.HATE,
  CATEGORIES.GENDER,
  CATEGORIES.CIVIL,
  CATEGORIES.ASYLUM,
];

export const CATEGORIES_FULL_NAME = {
  [CATEGORIES.EQUALITY]: "Equality and non-discrimination",
  [CATEGORIES.FAMILY]: "Family",
  [CATEGORIES.HATE]: "Hate crime and hate speech",
  [CATEGORIES.GENDER]: "Legal gender recognition & Intersex bodily integrity",
  [CATEGORIES.CIVIL]: "Civil society space",
  [CATEGORIES.ASYLUM]: "Asylum",
};

export const RAINBOW_COLORS = [
  "#E94A40",
  "#FFA43F",
  "#F8D92B",
  "#12A77B",
  "#2F4AB7",
  "#8849B3",
];

export const RAINBOW_COLORS_CLASSIC = [
  "#E40303",
  "#FF8C00",
  "#FFED00",
  "#008026",
  "#004CFF",
  "#732982",
];
