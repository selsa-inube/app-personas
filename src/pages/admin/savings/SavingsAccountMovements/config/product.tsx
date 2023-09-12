function truncateAndObfuscateDescription(description: string, type: string) {
  if (type === "CA") {
    const lastFourCharacters = description.slice(-4);
    return "**" + lastFourCharacters;
  } else {
    return description;
  }
}

export { truncateAndObfuscateDescription };
