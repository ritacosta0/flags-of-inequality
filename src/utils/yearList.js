export function yearList(list) {
  const uniqueYears = [...new Set(list.map((item) => item.year))];
  return uniqueYears;
}
