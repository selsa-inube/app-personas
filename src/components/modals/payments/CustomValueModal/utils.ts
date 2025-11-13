interface IApplyPayOption {
  id: string;
  label: string;
  proximityThreshold: number;
  roundingFactor: number;
}

const mapErrorValidation = (code: string): string => {
  const errorValues: Record<string, string> = {
    ConfigurationError: "Error de configuración",
    ExceedBalance: "El valor excede el saldo total",
  };
  return errorValues[code];
};

export { mapErrorValidation };
export type { IApplyPayOption };
