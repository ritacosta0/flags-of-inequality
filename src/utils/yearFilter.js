export function yearFilter(object, filterValue) {
  const filteredObject = object.filter((i) => i.year === filterValue);
  return filteredObject;
}
