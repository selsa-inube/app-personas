import { FormikProps } from "formik";
import { getCalculatedAidConditions } from "src/services/iclient/aids/getCalculatedAidConditions";
import { ICalculatedAidConditionsRequest } from "src/services/iclient/aids/getCalculatedAidConditions/types";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { IDetailsSituationEntry } from "./types";

const valuesAndValidationsAid = async (
  accessToken: string,
  beneficiaryId: string,
  userIdentification: string,
  aidId: string,
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>,
  withAmount: boolean,
  withDays: boolean,
  formik: FormikProps<IDetailsSituationEntry>,
) => {
  const requestConditions: ICalculatedAidConditionsRequest = {
    aidId,
    beneficiaryId,
    userIdentification,
  };
  const responseConditions = await getCalculatedAidConditions(
    requestConditions,
    accessToken,
  );

  let newValidationSchema = validationSchema;

  if (withAmount) {
    formik.setFieldValue("quotaAvailable", responseConditions?.aidLimit || 0);
    newValidationSchema = validationSchema.concat(
      Yup.object({
        applicationValue: Yup.number()
          .min(1, "El valor de la solicitud debe ser mayor a 0")
          .max(responseConditions?.aidLimit || 0, "Has superado el cupo máximo")
          .required(validationMessages.required),
      }),
    );
  } else if (withDays) {
    formik.setFieldValue("applicationDays", responseConditions?.aidLimit || 0);
    newValidationSchema = validationSchema.concat(
      Yup.object({
        applicationDays: Yup.number()
          .min(1, "La cantidad de días debe ser mayor a 0")
          .max(
            responseConditions?.aidLimit || 0,
            "Has superado la cantidad de días disponibles",
          )
          .required(validationMessages.required),
      }),
    );
  }

  return newValidationSchema;
};

export { valuesAndValidationsAid };
