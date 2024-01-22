const typesofMovementMock: Record<string, string> = {
  CB: "Consignación bancaria",
  DN: "Descuento de nómina",
};

const movementDescriptionMock = (reference: string) => {
  const [, , code] = reference.split("-");

  if (code) {
    return typesofMovementMock[code.toUpperCase()];
  }

  return "";
};

const peridiocityValuesMock: Record<string, string> = {
  Annual: "Anual",
  Biweekly: "Quincenal",
  Monthly: "Mensual",
  Semiannual: "Semestral",
};

const amortizationTypeValuesMock: Record<string, string> = {
  IntegralFixedQuota: "Cuota fija integral",
  FixedCapitalQuota: "Abonos fijos a capital",
};

const guaranteeTypeValuesMock: Record<string, string> = {
  PersonalWithDiscountAuthorization: "Personal con libranza",
  PersonalWithoutDiscountAuthorization: "Personal sin libranza",
  RealWithDiscountAuthorization: "Real con libranza",
  RealWithoutDiscountAuthorization: "Real sin libranza",
};

export {
  amortizationTypeValuesMock,
  guaranteeTypeValuesMock,
  peridiocityValuesMock,
  movementDescriptionMock,
};
