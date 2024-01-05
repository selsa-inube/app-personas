const compareArraysByProperty = (
  arr1: Record<string, any>[],
  arr2: Record<string, any>[],
  property: string
) => {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item, index) => item[property] === arr2[index][property]);
};

export { compareArraysByProperty };
