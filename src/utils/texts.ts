const removeLastCharacters = (
    wordOfCell: string,
    numberCharactersRemove: number
  ): number => {
    return Number(wordOfCell.slice(0, -numberCharactersRemove));
  };

  export {removeLastCharacters};