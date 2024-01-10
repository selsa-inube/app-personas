import { dictionary } from "./dictionary";

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

const capitalizeFirstLetters = (text: string) =>
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const translateWord = (word: string) => {
  const normalizedword = capitalizeText(word.toLowerCase());
  for (const [key, value] of Object.entries(dictionary)) {
    if (normalizedword === key) return value;
  }
  return "";
};

const replaceWord = (
  sentence: string,
  wordToReplace: string,
  replacementByWord: string
) => {
  return sentence.replace(wordToReplace, replacementByWord);
};

export {
  capitalizeText,
  capitalizeFirstLetters,
  truncateAndObfuscateDescription,
  translateWord,
  replaceWord,
};
