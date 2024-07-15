const equalArraysByProperty = (
  arr1: Array<object>,
  arr2: Array<object>,
  property: string,
) => {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((item) => {
    return arr2.some(
      (item2) =>
        item[property as keyof typeof item] ===
        item2[property as keyof typeof item2],
    );
  });
};

export { equalArraysByProperty };
