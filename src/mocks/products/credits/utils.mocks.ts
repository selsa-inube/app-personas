const typesofMovementMock: Record<string, string> = {
  CB: "Consignación bancaria",
  DN: "Descuento de nomina ",
};

const movementDescriptionMock = (reference: string) => {
  const [, , code] = reference.split("-");

  if (code) {
    return typesofMovementMock[code.toUpperCase()];
  }

  return "";
};

export { movementDescriptionMock };
