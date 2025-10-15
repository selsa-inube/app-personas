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
    formik.setFieldValue(calculateForAmount ? "costAid" : "daysAid", aidValue);
    formik.setFieldValue("aidLimit", responseConditions?.aidLimit || 0);
    formik.setFieldValue("hasUtilization", responseConditions?.hasUtilization || false);
    formik.setFieldValue("utilizationLimit", responseConditions?.utilizationLimit || 0);
    formik.setFieldValue("remainingQuota", responseConditions?.remainingQuota || 0);
    let newValidationSchema = validationSchema;

    if (calculateForAmount && responseConditions?.aidLimit) {
      formik.setFieldValue("aidLimit", responseConditions.aidLimit);
      newValidationSchema = validationSchema.concat(
        Yup.object({
          costAid: Yup.number()
            .min(1, "El valor de la solicitud debe ser mayor a 0")
            .max(responseConditions.aidLimit, "El valor no puede exceder el límite de auxilio")
            .max(responseConditions?.remainingQuota || 0, "El valor no puede exceder la cuota restante")
            .test(
              'no-negative-remaining',
              'El valor no puede dejar la cuota en negativo',
              function (value) {
                const remainingAfter = (responseConditions?.aidLimit || 0) - (value || 0);
                return remainingAfter >= 0;
              }
            )
            .required(validationMessages.required),
        }),
      );
    }

    if (!calculateForAmount) {
      if (responseConditions?.hasUtilization && (responseConditions?.utilizationLimit || 0) <= 1) {
        Yup.object({
          utilization: Yup.number()
            .min(1, "Has superado la cantidad maxima de veces que puedes usar el auxilio.")
            .required(validationMessages.required),
        });
      }

      if (responseConditions?.aidLimit) {
        newValidationSchema = validationSchema.concat(
          Yup.object({
            daysAid: Yup.number()
              .min(1, "La cantidad de días debe ser mayor a 0")
              .max(responseConditions.aidLimit, "Has superado la cantidad de días disponibles")
              .required(validationMessages.required),
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
        screen: "DetailsSituationForm",
        file: "src/pages/request/aids/AidRequest/forms/DetailsSituationForm/utils.ts",
      },
      { feature: "request-aid" },
    );

    return validationSchema;
  }
};

export { valuesAndValidationsAid };
