export function countryList(list) {
  const uniqueCountries = [...new Set(list.map((item) => item.country))];
  return uniqueCountries;
}
