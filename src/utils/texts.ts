const truncateAndObfuscateDescription = (
  description: string,
  type: string,
  lengthToShow: number
) => {
  if (type === "CA") {
    const truncatedText = description.slice(-lengthToShow);
    return "**" + truncatedText;
  } else {
    return description;
  }
};

const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const removeLastCharacters = (
  wordOfCell: string,
  numberCharactersRemove: number
): number => {
  return Number(wordOfCell.slice(0, -numberCharactersRemove));
};

export { capitalizeText, truncateAndObfuscateDescription, removeLastCharacters };
