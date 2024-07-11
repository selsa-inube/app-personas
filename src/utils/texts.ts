const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const capitalizeEachWord = (text: string) =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const removeLastCharacters = (
  wordOfCell: string,
  numberCharactersRemove: number,
): number => {
  return Number(wordOfCell.slice(0, -numberCharactersRemove));
};

const truncateFileName = (name: string, maxLength: number) => {
  return `${name.split(".")[0].slice(0, maxLength)}${name.length > maxLength ? "... " : ""}.${name.split(".")[1]}`;
};

const obfuscateText = (text: string, start: number, end: number) => {
  return text.replace(
    new RegExp(`(\\w{${start}})(\\w+)(\\w{${end}})`),
    (_, first, middle, last) => first + "*".repeat(middle.length) + last,
  );
}

export {
  capitalizeEachWord,
  capitalizeText,
  removeLastCharacters,
  truncateFileName,
  obfuscateText,
};
