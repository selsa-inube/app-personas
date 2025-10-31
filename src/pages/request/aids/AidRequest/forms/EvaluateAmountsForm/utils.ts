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

    if (calculateForAmount || calculateForDays) {
      formik.setFieldValue(calculateForAmount ? "aidCost" : "aidDays", responseConditions?.aidValue || 0);
    }

    if (calculateForPerson) {
      formik.setFieldValue("aidCost", responseConditions?.aidValue);
    }

    formik.setFieldValue("aidLimit", responseConditions?.aidLimit || 0);
    formik.setFieldValue("hasUtilization", responseConditions?.hasUtilization || false);
    formik.setFieldValue("utilizationLimit", responseConditions?.utilizationLimit || 0);
    formik.setFieldValue("remainingQuota", responseConditions?.remainingQuota || 0);
    let newValidationSchema = validationSchema;

    if (calculateForAmount && responseConditions?.aidLimit) {
      newValidationSchema = validationSchema.concat(
        Yup.object({
          aidCost: Yup.number()
            .min(1, validationMessages.minCurrencyNumbers(1))
            .max(responseConditions.aidLimit, validationMessages.maxCurrencyNumbers(responseConditions.aidLimit))
            .required(validationMessages.required),
          aidLimit: Yup.number().min(1).required(),
        }),
      );
    }

    if (calculateForDays && responseConditions?.aidLimit) {
      newValidationSchema = newValidationSchema.concat(
        Yup.object({
          aidDays: Yup.number()
            .min(1, validationMessages.minCurrencyNumbers(1))
            .required(validationMessages.required),
          aidLimit: Yup.number().min(1).required(),
        }),
      );
    }

    if (calculateForPerson && responseConditions?.utilizationLimit) {
      newValidationSchema = newValidationSchema.concat(
        Yup.object({
          utilizationLimit: Yup.number().moreThan(responseConditions?.utilizationLimit).required(),
          hasUtilization: Yup.boolean().isFalse().required(),
          aidLimit: Yup.number().min(1).required(),
        }),
      );
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
