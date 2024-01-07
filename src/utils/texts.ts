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

function capitalizeFirstLetters(text: string) {
  var words = text.split(" ");
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  var result = capitalizedWords.join(" ");
  return result;
}

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
