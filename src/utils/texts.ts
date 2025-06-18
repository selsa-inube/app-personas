const capitalizeText = (text: string) => {
  const textWithoutSpaces = text.trim();
  return (
    textWithoutSpaces.trim().charAt(0).toUpperCase() +
    textWithoutSpaces.slice(1).toLowerCase()
  );
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

const truncateFileName = (name: string, maxLength: number): string => {
  const lastDotIndex = name.lastIndexOf(".");
  const base = name.substring(0, lastDotIndex);
  const ext = name.substring(lastDotIndex);

  const truncatedBase =
    base.length > maxLength ? base.slice(0, maxLength) + "... " : base;

  return `${truncatedBase}${ext}`;
};

const obfuscateText = (text: string, start: number, end: number) => {
  return text.replace(
    new RegExp(`(\\w{${start}})(\\w+)(\\w{${end}})`),
    (_, first, middle, last) => first + "*".repeat(middle.length) + last,
  );
};

const obfuscateCardNumber = (number: string | null): string => {
  if (!number) return "";

  if (number.length <= 4) {
    return number;
  }

  const lastFourDigits = number.slice(-4);
  return `**** ${lastFourDigits}`;
};

const obfuscateCardNumberDocument = (number: string | null): string | null => {
  if (!number) return null;

  const lastFourDigits = number.slice(-4);
  const obfuscatedPart = number.slice(0, -4).replace(/\d/g, "X");
  return `${obfuscatedPart.replace(/(.{4})/g, "$1 - ").trim()} ${lastFourDigits}`;
};

const correctSpecialCharacters = (text: string): string => {
  const substitutionMap: { [key: string]: string } = {
    "ã³": "ó",
    "ã¡": "á",
    "ã©": "é",
    "ã­": "í",
    ãº: "ú",
    "ã±": "ñ",
    "ã¼": "ü",
    "Ã¡": "Á",
    "Ã©": "É",
    "Ã­": "Í",
    "Ã³": "Ó",
    Ãº: "Ú",
    "Ã±": "Ñ",
    "Ã¼": "Ü",
  };

  for (const [incorrect, correct] of Object.entries(substitutionMap)) {
    text = text.replace(new RegExp(incorrect, "g"), correct);
  }

  return text;
};

export {
  capitalizeEachWord,
  capitalizeText,
  correctSpecialCharacters,
  obfuscateCardNumber,
  obfuscateCardNumberDocument,
  obfuscateText,
  removeLastCharacters,
  truncateFileName,
};
