import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { DetailsSituationFormUI } from "./interface";
import { IDetailsSituationEntry } from "./types";

const aidsWithAmount = [
  "hospitalization_surgery",
  "diagnostic_aids",
  "orthopedic_implements",
  "addiction_problems",
  "partial_damage_house",
  "total_housing_damage",
  "orthopedic_boots",
  "medications",
  "transfers_medical",
  "temporary_accompaniment",
  "lenses",
  "incapacity_180_days",
  "aids_sports_artistic_activities",
  "damage_basic_household",
];

const aidsWithDays = ["initial_disability", "disability_extension"];

const validationSchema = Yup.object().shape({
  message: Yup.string(),
});

interface DetailsSituationFormProps {
  initialValues: IDetailsSituationEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsSituationForm = forwardRef(function DetailsSituationForm(
  props: DetailsSituationFormProps,
  ref: React.Ref<FormikProps<IDetailsSituationEntry>>,
) {
  const { initialValues, onFormValid } = props;
  const { aid_type } = useParams();

  const [dynamicSchema, setDynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  const withAmount = aidsWithAmount.includes(aid_type || "");

  const withDays = aidsWithDays.includes(aid_type || "");

  useEffect(() => {
    let newValidationSchema = validationSchema;

    if (withAmount) {
      newValidationSchema = validationSchema.concat(
        Yup.object({
          applicationValue: Yup.number()
            .min(1, "El valor de la solicitud debe ser mayor a 0")
            .max(
              initialValues.quotaAvailable || 0,
              "Has superado el cupo máximo",
            )
            .required(validationMessages.required),
        }),
      );
    } else if (withDays) {
      newValidationSchema = validationSchema.concat(
        Yup.object({
          applicationDays: Yup.number()
            .min(1, "La cantidad de días debe ser mayor a 0")
            .max(
              initialValues.daysAvailable || 0,
              "Has superado la cantidad de días disponibles",
            )
            .required(validationMessages.required),
        }),
      );
    }

    setDynamicSchema(newValidationSchema);
  }, []);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid && onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values, dynamicSchema]);

  return (
    <DetailsSituationFormUI
      formik={formik}
      withAmount={withAmount}
      withDays={withDays}
    />
  );
});

export { DetailsSituationForm };
export type { DetailsSituationFormProps };
