import { savingAccountCode } from "@pages/admin/savings/MySavings/config/products";

const truncateAndObfuscateDescription = (
  description: string,
  type: string,
  lengthToShow: number,
) => {
  if (type === savingAccountCode) {
    const truncatedText = description.slice(-lengthToShow);
    return "**" + truncatedText;
  } else {
    return description;
  }
};

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const capitalizeFirstLetters = (text: string) =>
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

export {
  capitalizeFirstLetters,
  capitalizeText,
  removeLastCharacters,
  truncateAndObfuscateDescription,
};
