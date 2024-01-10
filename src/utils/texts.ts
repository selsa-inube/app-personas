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
  truncateAndObfuscateDescription,
  translateWord,
  replaceWord,
};
