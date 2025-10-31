import { FormikProps } from "formik";
import { captureNewError } from "src/services/errors/handleErrors";
import { getCalculatedAidConditions } from "src/services/iclient/aids/getCalculatedAidConditions";
import { ICalculatedAidConditionsRequest } from "src/services/iclient/aids/getCalculatedAidConditions/types";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { IEvaluateAmountsEntry } from "./types";

const valuesAndValidationsAid = async (
  aidValue: number,
  accessToken: string,
  beneficiaryId: string,
  userIdentification: string,
  aidId: string,
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>,
  calculateForAmount: boolean,
  calculateForDays: boolean,
  calculateForPerson: boolean,
  formik: FormikProps<IEvaluateAmountsEntry>,
) => {
  try {
    const requestConditions: ICalculatedAidConditionsRequest = {
      aidCode: aidId,
      beneficiaryPublicCode: beneficiaryId,
      customerPublicCode: userIdentification,
      aidValue: aidValue,
    };

    const responseConditions = await getCalculatedAidConditions(
      requestConditions,
      accessToken,
    );

    formik.setFieldValue("calculatedAidValue", responseConditions?.aidValue || 0);

    if (calculateForPerson) {
      formik.setFieldValue("aidCost", responseConditions?.aidValue);
    }

    formik.setFieldValue("aidLimit", responseConditions?.aidLimit || 0);
    formik.setFieldValue("hasUtilization", responseConditions?.hasUtilization || false);
    formik.setFieldValue("utilizationLimit", responseConditions?.utilizationLimit || 0);
    formik.setFieldValue("remainingQuota", responseConditions?.remainingQuota || 0);

    let newValidationSchema = validationSchema;

    const hasUtilization = responseConditions?.hasUtilization;
    const aidLimit = responseConditions?.aidLimit;
    const utilizationLimit = responseConditions?.utilizationLimit;

    if (hasUtilization && utilizationLimit) {
      formik.setFieldValue("aidLimit", 1);
      const baseValidation = {
        utilizationLimit: Yup.number().min(1).required(),
      };

      if (calculateForAmount) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object({
            aidCost: Yup.number()
              .min(1, validationMessages.minCurrencyNumbers(1))
              .required(validationMessages.required),
            ...baseValidation,
          }),
        );
      } else if (calculateForDays) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object({
            aidDays: Yup.number()
              .min(1, validationMessages.minCurrencyNumbers(1))
              .required(validationMessages.required),
            ...baseValidation,
          }),
        );
      } else if (calculateForPerson) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object(baseValidation),
        );
      }
    } else {
      if (calculateForAmount && aidLimit) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object({
            aidCost: Yup.number()
              .min(1, validationMessages.minCurrencyNumbers(1))
              .max(aidLimit, validationMessages.maxCurrencyNumbers(aidLimit))
              .required(validationMessages.required),
            aidLimit: Yup.number().min(1).required(),
          }),
        );
      } else if (calculateForDays) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object({
            aidDays: Yup.number()
              .min(1, validationMessages.minCurrencyNumbers(1))
              .required(validationMessages.required),
            aidLimit: Yup.number().min(1).required(),
          }),
        );
      } else if (calculateForPerson) {
        newValidationSchema = newValidationSchema.concat(
          Yup.object({
            aidLimit: Yup.number().min(1).required(),
          }),
        );
      }
    }

    return newValidationSchema;
  } catch (error) {
    captureNewError(
      error,
      {
        inFunction: "valuesAndValidationsAid",
        action: "getCalculatedAidConditions",
        screen: "EvaluateAmountsForm",
        file: "src/pages/request/aids/AidRequest/forms/EvaluateAmountsForm/utils.ts",
      },
      { feature: "request-aid" },
    );

    return validationSchema;
  }
};

export { valuesAndValidationsAid };
