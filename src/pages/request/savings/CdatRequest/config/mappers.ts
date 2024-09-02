import { systemValidationsMock } from "@mocks/products/credits/request.mocks";
import { IValidation } from "src/model/entity/service";
import { ISystemValidationsEntry } from "../forms/SystemValidationsForm/types";

const mapSystemValidations = (): ISystemValidationsEntry => {
  const validations: IValidation[] = [];

  systemValidationsMock.forEach((regulation) => {
    validations.push({
      id: regulation.id,
      label: regulation.label,
      value: "pending",
      isRequired: regulation.isRequired,
    });
  });

  return {
    validations,
  };
};

export { mapSystemValidations };
