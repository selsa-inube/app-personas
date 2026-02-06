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
import { SimulateCreditFormUI } from "./interface";
import { ESimulationStep, ISimulateCreditEntry } from "./types";
import {
  calculateExtraordinaryQuotasAvailability,
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

  const [loadingContinue, setLoadingContinue] = useState(false);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<ESimulationStep>(
    ESimulationStep.VALUES,
  );
  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicValidationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    setDynamicValidationSchema(
      getInitialSimulateCreditValidations(formik, false),
    );
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

  const handleToggleDisbursementModal = () => {
    setShowDisbursementModal(!showDisbursementModal);
  };

  const handleSimulationTypeChange = (tabId: string) => {
    formik.setFieldValue("simulationWithQuota", tabId === "simulatedWithQuota");

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

  const handleContinueToStep = async () => {
    if (!accessToken || !user) return;
    setLoadingContinue(true);

    if (currentStep === ESimulationStep.VALUES) {
      const extraPaymentResponse =
        await calculateExtraordinaryQuotasAvailability(
          formik,
          accessToken,
          user,
        );

      if (extraPaymentResponse && extraPaymentResponse.allowExtraPayment) {
        await formik.setFieldValue("extraordinaryQuotas", {
          isAvailable: extraPaymentResponse.allowExtraPayment,
          maxQuotas: extraPaymentResponse.maxQuotas,
          percentageExtraPayment: extraPaymentResponse.percentageExtraPayment,
          quotas: 0,
          valuePerQuota: 0,
        });
      }

      setCurrentStep(ESimulationStep.EXTRAORDINARY_QUOTAS);
      scrollToBottom("main");
    } else {
      setCurrentStep(ESimulationStep.SIMULATION);
      scrollToBottom("main");
    }
    setLoadingContinue(false);
  };

  const handleReset = () => {
    setCurrentStep(ESimulationStep.VALUES);
    formik.setFieldValue("amount", undefined);
    formik.setFieldValue("simulationWithQuota", true);
    formik.setFieldValue("deadline", undefined);
    formik.setFieldValue("quota", undefined);
    formik.setFieldValue("extraordinaryQuotas", {
      isAvailable: false,
      maxQuotas: 0,
      percentageExtraPayment: 0,
      maxValuePerQuota: 0,
      quotas: 0,
      valuePerQuota: 0,
    });

    formik.setFieldValue("hasResult", false);
  };

  const simulateCredit = async () => {
    setLoadingContinue(true);
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

      if (
        formik.values.extraordinaryQuotas.isAvailable &&
        formik.values.extraordinaryQuotas.quotas &&
        formik.values.extraordinaryQuotas.valuePerQuota
      ) {
        simulationRequestData.extraordinaryQuotas = {
          quotas: formik.values.extraordinaryQuotas.quotas,
          valuePerQuota: formik.values.extraordinaryQuotas.valuePerQuota,
        };
      }

      const simulationResponse = await simulateCreditConditions(
        simulationRequestData,
        accessToken,
      );

      if (simulationResponse) {
        formik.setFieldValue(
          "quota",
          formik.values.simulationWithQuota ? quota : simulationResponse.quota,
        );
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
        setCurrentStep(ESimulationStep.RESULTS);
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
      setLoadingContinue(false);
    }
  };

  const periodicityOptions = formik.values.periodicities.map(
    (periodicity: IPeriodicity) => {
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
    },
  );

  return (
    <SimulateCreditFormUI
      loading={loading}
      formik={formik}
      loadingContinue={loadingContinue}
      periodicityOptions={periodicityOptions}
      currentStep={currentStep}
      showDisbursementModal={showDisbursementModal}
      simulateCredit={simulateCredit}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
      onChangePaymentMethod={handleChangePaymentMethod}
      onChangePeriodicity={handleChangePeriodicity}
      onSimulationTypeChange={handleSimulationTypeChange}
      onContinueStep={handleContinueToStep}
      onReset={handleReset}
    />
  );
});

export { SimulateCreditForm };
export type { SimulateCreditFormProps };
