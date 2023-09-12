const currencyFormat = (price: number): string => {
  if (price === 0) {
    return "$ 0.00";
  }

  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

function truncateAndObfuscateDescription(
  description: string,
  type: string,
  lengthToShow: number
) {
  if (type === "CA") {
    const truncatedText = description.slice(-lengthToShow);
    return "**" + truncatedText;
  } else {
    return description;
  }
}

export { currencyFormat, truncateAndObfuscateDescription };
