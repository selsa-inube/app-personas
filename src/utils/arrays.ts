const compareArraysByProperty = (
  arr1: Record<string, string | number | object>[],
  arr2: Record<string, string | number | object>[],
  property: string,
) => {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item, index) => item[property] === arr2[index][property]);
};

export { compareArraysByProperty };
