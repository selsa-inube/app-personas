import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
import { IOtherValueRequest, IOtherValueResponse } from "./types";

const mapValidateOtherValueEntityToApi = (
  otherValue: IOtherValueRequest,
): Record<string, string | number> => {
  return {
    amount: otherValue.amount,
    obligationNumber: otherValue.obligationNumber,
  };
};

const mapOptionEntityToEntity = (option: string): IApplyPayOption => {
  return {
    id: option as EPaymentOptionType,
    label: paymentOptionValues[option],
  };
};

const mapOptionsEntityToEntity = (options: string[]): IApplyPayOption[] => {
  return options.map((option) => mapOptionEntityToEntity(option));
};

const mapValidateOtherValueEntityToEntity = (
  otherValue: Record<string, string | object>,
): IOtherValueResponse => {
  const options = otherValue.options;

  return {
    isValid: Boolean(otherValue.isValid),
    options: Array.isArray(options) ? mapOptionsEntityToEntity(options) : [],
    errorValidation: String(otherValue.errorValidation || ""),
  };
};

export {
  mapValidateOtherValueEntityToApi,
  mapValidateOtherValueEntityToEntity,
};
