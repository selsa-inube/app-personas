import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";

interface IApplyPayOption {
  id: EPaymentOptionType;
  label: string;
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
