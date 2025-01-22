import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { getCalculatedCdatConditions } from "src/services/iclient/savings/getCalculatedCdatConditions";
import { ICalculatedCdatConditionsRequest } from "src/services/iclient/savings/getCalculatedCdatConditions/types";
import { getCdatRateTerms } from "src/services/iclient/savings/getCdatRatesTerms";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeadlineFormUI } from "./interface";
import { IDeadlineEntry } from "./types";
import { validationSchema } from "./utils";

interface DeadlineFormProps {
  initialValues: IDeadlineEntry;
  loading?: boolean;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDeadlineEntry) => void;
}

const DeadlineForm = forwardRef(function DeadlineForm(
  props: DeadlineFormProps,
  ref: React.Ref<FormikProps<IDeadlineEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);

  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const getRateTerms = () => {
    if (!accessToken) return;

    getCdatRateTerms(
      accessToken,
      formik.values.productId,
      formik.values.investmentValue,
    ).then((rateTerms) => {
      formik.setFieldValue("rateTerms", rateTerms);
    });
  };

  useEffect(() => {
    formik.setFieldValue("simulationWithDays", true);
    getRateTerms();
  }, [accessToken]);

  const simulateCDAT = async () => {
    let inRange = false;

    for (const term of formik.values.rateTerms) {
      if (
        formik.values.deadlineDays &&
        formik.values.deadlineDays >= term.deadlineFrom &&
        formik.values.deadlineDays <= term.deadlineTo
      ) {
        inRange = true;
        break;
      }
    }

    if (!inRange) {
      addFlag({
        title: "La simulación no pudo ser procesada",
        description:
          "El plazo no está dentro del rango de tasas de interés vigentes.",
        appearance: "danger",
        duration: 5000,
      });

      return;
    }

    setLoadingSimulation(true);
    try {
      if (
        !accessToken ||
        !user?.identification ||
        !formik.values.deadlineDays
      ) {
        throw new Error("No se pudo obtener la información necesaria");
      }

      const conditionsRequestData: ICalculatedCdatConditionsRequest = {
        userIdentification: user.identification,
        deadline: formik.values.deadlineDays,
        investmentValue: formik.values.investmentValue,
        productId: formik.values.productId,
      };

      const conditionsResponse = await getCalculatedCdatConditions(
        conditionsRequestData,
        accessToken,
      );

      formik.setFieldValue("effectiveAnnualRate", conditionsResponse?.rate);
      formik.setFieldValue("totalInterest", conditionsResponse?.returns);
      formik.setFieldValue(
        "withholdingTax",
        conditionsResponse?.withholdingTax,
      );
      formik.setFieldValue(
        "expirationDate",
        conditionsResponse?.expirationDate,
      );
      formik.setFieldValue("deadlineDate", conditionsResponse?.expirationDate);
      formik.setFieldValue("hasResult", true);
      onFormValid(true);
    } catch (error) {
      addFlag({
        title: "La simulación no pudo ser procesada",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        appearance: "danger",
        duration: 5000,
      });

      onFormValid(false);
    } finally {
      setLoadingSimulation(false);
    }
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.handleChange(event);

    if (
      event.target.name === "simulationWithDate" ||
      event.target.name === "simulationWithDays"
    ) {
      const fieldsToReset = [
        "deadlineDate",
        "deadlineDays",
        "totalInterest",
        "withholdingTax",
        "hasResult",
      ];

      fieldsToReset.forEach((field) => formik.setFieldValue(field, ""));
      formik.setFormikState((state) => ({
        ...state,
        touched: {
          ...state.touched,
          deadlineDate: false,
          deadlineDays: false,
        },
      }));

      const checked = "checked" in event.target && event.target.checked;
      if (!checked) return;

      let newValidationSchema = dynamicValidationSchema;

      if (event.target.name === "simulationWithDate") {
        newValidationSchema = dynamicValidationSchema.concat(
          Yup.object({
            deadlineDate: validationRules.notPastDate.required(
              validationMessages.required,
            ),
          }),
        );
      } else if (event.target.name === "simulationWithDays") {
        newValidationSchema = dynamicValidationSchema.concat(
          Yup.object({
            deadlineDays: Yup.number().required(validationMessages.required),
          }),
        );
      }

      setDynamicValidationSchema(newValidationSchema);
    }

    formik.setFieldValue("hasResult", false);
    onFormValid(false);
  };

  return (
    <DeadlineFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      simulateCDAT={simulateCDAT}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
    />
  );
});

export { DeadlineForm };
export type { DeadlineFormProps };
