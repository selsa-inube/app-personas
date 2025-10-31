import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import * as Yup from "yup";
import { EvaluateAmountsFormUI } from "./interface";
import { IEvaluateAmountsEntry, ESimulationState } from "./types";
import { aidTypeDM } from "src/model/domains/services/aids/aidTypeDM";
import { useLocation } from "react-router";
import { valuesAndValidationsAid } from "./utils";
import { useAuth } from "@inube/auth";
import { AppContext } from "src/context/app";
import { IBeneficiary } from "src/model/entity/user";
import { captureNewError } from "src/services/errors/handleErrors";
import { useFlag } from "@inubekit/inubekit";
import { validationMessages } from "src/validations/validationMessages";

interface EvaluateAmountsFormProps {
  initialValues: IEvaluateAmountsEntry;
  beneficiary?: IBeneficiary;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EvaluateAmountsForm = forwardRef(function EvaluateAmountsForm(
  props: EvaluateAmountsFormProps,
  ref: React.Ref<FormikProps<IEvaluateAmountsEntry>>,
) {
  const { initialValues, beneficiary, onFormValid } = props;
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const location = useLocation();
  const { addFlag } = useFlag();

  const calculateForAmount = location.state?.type.id === aidTypeDM.REQUIRED_AMOUNT.id
  const calculateForDays = location.state?.type.id === aidTypeDM.REQUIRED_DAYS.id
  const calculateForPerson = location.state?.type.id === aidTypeDM.REQUIRED_PERSON.id

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      aidCost: calculateForAmount
        ? Yup.number().min(1, validationMessages.minCurrencyNumbers(1)).required(validationMessages.required)
        : Yup.number().nullable(),
      aidLimit: Yup.number().min(1).required(),
      aidDays: calculateForDays
        ? Yup.number().min(1, validationMessages.minCurrencyNumbers(1)).required(validationMessages.required)
        : Yup.number().nullable(),
    });
  }, [calculateForAmount]);

  const [dynamicSchema, setDynamicSchema] = useState<Yup.ObjectSchema<Yup.AnyObject>>(validationSchema);
  const [simulationState, setSimulationState] = useState<ESimulationState>(ESimulationState.IDLE);


  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    formik.setFieldValue("aidId", location.state?.id);
    formik.setFieldValue("aidName", location.state?.title);
    formik.setFieldValue("aidType", location.state?.type);
  }, []);

  useEffect(() => {
    formik.validateForm().then((errors) => {
      onFormValid && onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  const simulateAid = async () => {
    try {
      if (!accessToken || !user.identification) return;
      setSimulationState(ESimulationState.LOADING);

      const aidValue = formik.values.aidCost;
      const aidDays = formik.values.aidDays;

      if ((aidValue && aidValue > 0) || (aidDays && aidDays > 0) || (calculateForPerson && beneficiary)) {
        const newValidationSchema = await valuesAndValidationsAid(
          aidValue || aidDays || 1,
          accessToken,
          beneficiary?.identificationNumber || "",
          user.identification,
          location.state?.id || "",
          dynamicSchema,
          calculateForAmount,
          calculateForDays,
          calculateForPerson,
          formik
        );
        setDynamicSchema(newValidationSchema);
        setSimulationState(ESimulationState.COMPLETED);
      }
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "simulateAid",
          action: "valuesAndValidationsAid",
          screen: "EvaluateAmountsForm",
          file: "src/pages/request/aids/AidRequest/forms/EvaluateAmountsForm/index.tsx",
        },
        { feature: "request-aid" },
      );
      setSimulationState(ESimulationState.IDLE);
      addFlag({
        title: "Al parecer algo ha salido mal...",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        appearance: "danger",
        duration: 5000,
      });
    }
  };

  return (
    <EvaluateAmountsFormUI
      formik={formik}
      forAmount={calculateForAmount}
      forDays={calculateForDays}
      forPerson={calculateForPerson}
      beneficiary={beneficiary}
      simulateAid={simulateAid}
      loadingSimulation={simulationState}
    />
  );
});

export { EvaluateAmountsForm };
export type { EvaluateAmountsFormProps };
