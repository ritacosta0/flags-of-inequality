export function countryFilter(object, filterValue) {
  const filteredObject = object.filter((i) => i.country === filterValue);
  return filteredObject;
}
