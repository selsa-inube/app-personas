import { useAuth } from "@inube/auth";
import { IMessage } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { MdErrorOutline } from "react-icons/md";
import { AppContext } from "src/context/app";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { initialMessageState } from "src/utils/messages";
import { SavingConditionsFormUI } from "./interface";
import { ISavingConditionsEntry } from "./types";
import {
  getInitialSavingConditionsValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
} from "./utils";

interface SavingConditionsFormProps {
  initialValues: ISavingConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ISavingConditionsEntry) => void;
  loading?: boolean;
}

const SavingConditionsForm = forwardRef(function SavingConditionsForm(
  props: SavingConditionsFormProps,
  ref: React.Ref<FormikProps<ISavingConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [message, setMessage] = useState<IMessage>(initialMessageState);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);

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

  useEffect(() => {
    setDynamicValidationSchema(getInitialSavingConditionsValidations());
  }, []);

  useEffect(() => {
    if (accessToken && user?.identification) {
      getValuesForSimulate(formik, accessToken, user.identification);
    }
  }, [accessToken, user.identification]);

  const handleChangePaymentMethod = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    if (!accessToken) return;

    const selectedMethod = formik.values.paymentMethods.find(
      (method) => method.id === value,
    );

    if (selectedMethod) {
      formik.setFieldValue("paymentMethod", {
        id: selectedMethod.id,
        value: selectedMethod.value,
      });

      await getPeriodicities(formik, accessToken, selectedMethod.id);
    }
  };

  const handleChangePeriodicity = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    if (!accessToken || !formik.values.paymentMethod) return;

    const selectedPeriodicity = formik.values.periodicities.find(
      (periodicity) => periodicity.id === value,
    );

    if (selectedPeriodicity) {
      formik.setFieldValue("periodicity", {
        id: selectedPeriodicity.id,
        description: selectedPeriodicity.description,
        periodicityInMonths: selectedPeriodicity.periodicityInMonths,
        periodicityInDays: selectedPeriodicity.periodicityInDays,
      });
    }
  };

  const simulateSaving = async () => {
    setLoadingSimulation(true);
    try {
      const paymentMethodId = formik.values.paymentMethod?.id;
      const deadline = formik.values.deadline;
      const quota = formik.values.quota;

      if (
        !paymentMethodId ||
        !accessToken ||
        !deadline ||
        !quota ||
        !formik.values.periodicity.periodicityInMonths
      ) {
        throw new Error("No se pudo obtener la información necesaria");
      }

      formik.setFieldValue("savingAmount", 1200000);
      formik.setFieldValue("annualRate", 9.72);
      formik.setFieldValue("yields", 54223);
      formik.setFieldValue("withholdingTax", 0);
      formik.setFieldValue("gmf", 0);
      formik.setFieldValue("netValue", 1254223);
      formik.setFieldValue("hasResult", true);

      onFormValid(true);
    } catch (error) {
      setMessage({
        show: true,
        title: "La simulación no pudo ser procesada",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        icon: <MdErrorOutline />,
        appearance: "danger",
      });

      onFormValid(false);
    } finally {
      setLoadingSimulation(false);
    }
  };

  const customHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    formik.setFieldValue("hasResult", false);
    formik.handleChange(event);
  };

  const handleToggleDisbursementModal = () => {
    setShowDisbursementModal(!showDisbursementModal);
  };

  const handleCloseMessage = () => {
    setMessage(initialMessageState);
  };

  const periodicityOptions = formik.values.periodicities.map((periodicity) => {
    const matchedDomain = periodicityDM.valueOf(periodicity.id);
    return matchedDomain
      ? { id: matchedDomain.id, value: matchedDomain.value }
      : { id: periodicity.id, value: periodicity.id };
  });

  return (
    <SavingConditionsFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      showDisbursementModal={showDisbursementModal}
      periodicityOptions={periodicityOptions}
      message={message}
      simulateSaving={simulateSaving}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
      onChangePaymentMethod={handleChangePaymentMethod}
      onChangePeriodicity={handleChangePeriodicity}
      handleCloseMessage={handleCloseMessage}
    />
  );
});

export { SavingConditionsForm };
export type { SavingConditionsFormProps };
