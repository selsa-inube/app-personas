import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import { IOtherValueRequest, IOtherValueResponse } from "./types";

const mapValidateOtherValueEntityToApi = (
  otherValue: IOtherValueRequest,
): Record<string, string | number> => {
  return {
    amount: otherValue.amount,
    obligationNumber: otherValue.obligationNumber,
  };
};

const mapOptionEntityToEntity = (
  option: string,
  proximityThreshold: number,
  roundingFactor: number,
): IApplyPayOption => {
  return {
    id: option,
    label: paymentOptionValues[option],
    proximityThreshold,
    roundingFactor,
  };
};

const mapOptionsEntityToEntity = (
  options: string[],
  proximityThreshold: number,
  roundingFactor: number,
): IApplyPayOption[] => {
  return options.map((option) =>
    mapOptionEntityToEntity(option, proximityThreshold, roundingFactor),
  );
};

const mapValidateOtherValueEntityToEntity = (
  otherValue: Record<string, string | object>,
): IOtherValueResponse => {
  const options = otherValue.options;

  return {
    isValid: Boolean(otherValue.isValid),
    options: Array.isArray(options)
      ? mapOptionsEntityToEntity(
          options,
          Number(otherValue.proximityThreshold || 0),
          Number(otherValue.roundingFactor || 0),
        )
      : [],
    errorValidation: String(otherValue.errorValidation || ""),
    roundingFactor: Number(otherValue.roundingFactor || 0),
  };
};

export {
  mapValidateOtherValueEntityToApi,
  mapValidateOtherValueEntityToEntity,
};
