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
import { getCalculatedConditionsForProduct } from "src/services/iclient/credits/getCalculatedConditions";
import { ICalculatedConditionsRequest } from "src/services/iclient/credits/getCalculatedConditions/types";
import { simulateCreditConditions } from "src/services/iclient/credits/simulateCreditConditions";
import { ISimulateCreditRequest } from "src/services/iclient/credits/simulateCreditConditions/types";
import { initialMessageState } from "src/utils/messages";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
import {
  getInitialCreditContidionValidations,
  getPeriodicities,
  getValuesForSimulate,
  validationSchema,
} from "./utils";

interface CreditConditionsFormProps {
  initialValues: ICreditConditionsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: ICreditConditionsEntry) => void;
  loading?: boolean;
}

const CreditConditionsForm = forwardRef(function CreditConditionsForm(
  props: CreditConditionsFormProps,
  ref: React.Ref<FormikProps<ICreditConditionsEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;

  const [loadingSimulation, setLoadingSimulation] = useState(false);
  const [message, setMessage] = useState<IMessage>(initialMessageState);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  const [disbursementModal, setDisbursementModal] =
    useState<IDisbursementModalState>({
      show: false,
      data: {
        spec: {
          amount: initialValues.amount || 0,
          anticipatedInterest: initialValues.anticipatedInterest,
          discounts: initialValues.discounts,
          charges: initialValues.charges,
        },
        approximateValue: initialValues.netValue,
      },
    });

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
    setDynamicValidationSchema(getInitialCreditContidionValidations(formik));
  }, []);

  useEffect(() => {
    if (accessToken && user?.identification) {
      getValuesForSimulate(formik, accessToken, user.identification);
    }
  }, [accessToken, user.identification, formik.values.product.id]);

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

      const calculateConditionsRequestData: ICalculatedConditionsRequest = {
        productId,
        paymentMethodId,
        userIdentification: user.identification,
        amount,
      };

      const calculationResponse = await getCalculatedConditionsForProduct(
        calculateConditionsRequestData,
        accessToken,
      );

      if (calculationResponse) {
        formik.setFieldValue("rate", calculationResponse.rate);
      }

      const rate = calculationResponse?.rate ?? 0;

      const simulationRequestData: ISimulateCreditRequest = {
        productId,
        paymentMethodId,
        userIdentification: user.identification,
        amount,
        periodicityInMonths: formik.values.periodicity.periodicityInMonths,
        deadline: formik.values.simulationWithQuota ? deadline || 0 : 0,
        quota: formik.values.simulationWithQuota ? quota || 0 : 0,
        rate,
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
        formik.setFieldValue("maxRate", simulationResponse.rate);
        formik.setFieldValue("deadline", simulationResponse.deadline);
        formik.setFieldValue("netValue", simulationResponse.netValue);
        formik.setFieldValue("hasResult", true);

        setDisbursementModal({
          ...disbursementModal,
          data: {
            spec: {
              amount: simulationResponse.amount,
              anticipatedInterest: simulationResponse.anticipatedInterest,
              discounts: simulationResponse.discountValue,
              charges: simulationResponse.chargeValue,
            },
            approximateValue: simulationResponse.netValue,
          },
        });
      }

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

    if (event.target.name === "simulationWithQuota") {
      const checked = "checked" in event.target && event.target.checked;

      if (checked) {
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
    }
  };

  const handleToggleDisbursementModal = () => {
    setDisbursementModal({
      ...disbursementModal,
      show: !disbursementModal.show,
    });
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
    <CreditConditionsFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      disbursementModal={disbursementModal}
      periodicityOptions={periodicityOptions}
      message={message}
      simulateCredit={simulateCredit}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
      onChangePaymentMethod={handleChangePaymentMethod}
      onChangePeriodicity={handleChangePeriodicity}
      handleCloseMessage={handleCloseMessage}
    />
  );
});

export { CreditConditionsForm };
export type { CreditConditionsFormProps };
