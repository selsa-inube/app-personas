import { useAuth } from "@inube/auth";
import { useFlag } from "@inubekit/inubekit";
import { scrollToBottom } from "@utils/pages";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { periodicityDM } from "src/model/domains/general/periodicityDM";
import { IPeriodicity } from "src/model/entity/periodicity";
import { captureNewError } from "src/services/errors/handleErrors";
import { simulateCreditConditions } from "src/services/iclient/credits/simulateCreditConditions";
import { ISimulateCreditRequest } from "src/services/iclient/credits/simulateCreditConditions/types";
import { simulatedTypeTabs } from "./config/tabs";
import { SimulateCreditFormUI } from "./interface";
import { ISimulateCreditEntry } from "./types";
import {
  getInitialSimulateCreditValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
} from "./utils";

interface SimulateCreditFormProps {
  initialValues: ISimulateCreditEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ISimulateCreditEntry) => void;
  loading?: boolean;
}

const SimulateCreditForm = forwardRef(function SimulateCreditForm(
  props: SimulateCreditFormProps,
  ref: React.Ref<FormikProps<ISimulateCreditEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
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
        onFormValid(
          errors.amount
            ? Object.keys(errors).length === 1
            : Object.keys(errors).length === 0,
        );
      });
    }
  }, [formik.values]);

  useEffect(() => {
    setDynamicValidationSchema(getInitialSimulateCreditValidations(formik));
  }, []);

  useEffect(() => {
    if (accessToken && user?.identification) {
      getValuesForSimulate(formik, accessToken, user.identification);
    }
  }, [accessToken, user.identification, formik.values.product.id]);

  const handleChangePaymentMethod = async (name: string, value: string) => {
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

  const handleChangePeriodicity = async (name: string, value: string) => {
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

  const simulateCredit = async () => {
    setLoadingSimulation(true);
    try {
      const productId = formik.values.product?.id;
      const paymentMethodId = formik.values.paymentMethod?.id;
      const amount = formik.values.amount;
      const deadline = formik.values.deadline;
      const quota = formik.values.quota;

      if (
        !productId ||
        !paymentMethodId ||
        !accessToken ||
        !amount ||
        !formik.values.periodicity.periodicityInMonths
      ) {
        throw new Error("No se pudo obtener la información necesaria");
      }

      const simulationRequestData: ISimulateCreditRequest = {
        productId,
        paymentMethodId,
        userIdentification: user.identification,
        amount,
        periodicityInMonths: formik.values.periodicity.periodicityInMonths,
        deadline: !formik.values.simulationWithQuota
          ? Number(deadline) || 0
          : 0,
        quota: formik.values.simulationWithQuota ? quota || 0 : 0,
        simulationParameter: formik.values.simulationWithQuota
          ? "QuotaValue"
          : "QuotaDeadline",
      };

      const simulationResponse = await simulateCreditConditions(
        simulationRequestData,
        accessToken,
      );

      if (simulationResponse) {
        formik.setFieldValue("quota", simulationResponse.quota);
        formik.setFieldValue("rate", simulationResponse.rate / 12);
        formik.setFieldValue("deadline", simulationResponse.deadline);
        formik.setFieldValue("netValue", simulationResponse.netValue);
        formik.setFieldValue(
          "anticipatedInterest",
          simulationResponse.anticipatedInterest,
        );
        formik.setFieldValue("discounts", simulationResponse.discounts);
        formik.setFieldValue("charges", simulationResponse.charges);
        formik.setFieldValue("periodicity", {
          id: simulationResponse.periodicity,
          description: simulationResponse.periodicity,
          periodicityInMonths: formik.values.periodicity.periodicityInMonths,
          periodicityInDays: formik.values.periodicity.periodicityInDays,
        });
        await formik.setFieldValue("hasResult", true);
        scrollToBottom("main");
      }

      onFormValid(true);
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "simulateCredit",
          action: "simulateCreditConditions",
          screen: "SimulateCreditForm",
          file: "src/pages/request/credits/CreditDestinationRequest/forms/SimulateCreditForm/index.tsx",
        },
        { feature: "request-credit" },
      );
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
    formik.setFieldValue("hasResult", false);
    formik.handleChange(event);
  };

  const handleToggleDisbursementModal = () => {
    setShowDisbursementModal(!showDisbursementModal);
  };

  const handleTabChange = (tabId: string) => {
    formik.setFieldValue(
      "simulationWithQuota",
      tabId === simulatedTypeTabs.simulatedWithQuota.id,
    );

    if (tabId === "simulatedWithQuota") {
      formik.setFormikState((state) => {
        return {
          ...state,
          touched: {
            ...state.touched,
            quota: false,
          },
        };
      });
    }

    formik.setFieldValue("quota", "");
    formik.setFieldValue("deadline", "");
    formik.setFieldValue("rate", "");
    formik.setFieldValue("netValue", "");
    formik.setFieldValue("hasResult", false);

    formik.setFormikState((state) => {
      return {
        ...state,
        touched: {
          ...state.touched,
          deadline: false,
        },
      };
    });
  };

  const periodicityOptions = formik.values.periodicities.map((periodicity: IPeriodicity) => {
    const matchedDomain = periodicityDM.valueOf(periodicity.id);
    return matchedDomain
      ? {
          id: matchedDomain.id,
          value: matchedDomain.id,
          label: matchedDomain.value,
        }
      : {
          id: periodicity.id,
          value: periodicity.id,
          label: periodicity.id,
        };
  });

  return (
    <SimulateCreditFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      showDisbursementModal={showDisbursementModal}
      periodicityOptions={periodicityOptions}
      simulateCredit={simulateCredit}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
      onChangePaymentMethod={handleChangePaymentMethod}
      onChangePeriodicity={handleChangePeriodicity}
      onTabChange={handleTabChange}
    />
  );
});

export { SimulateCreditForm };
export type { SimulateCreditFormProps };
