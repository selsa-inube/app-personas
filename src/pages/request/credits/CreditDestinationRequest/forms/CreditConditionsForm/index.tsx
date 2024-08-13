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
import { getCalculatedConditionsForProduct } from "src/services/iclient/credits/getCalculatedConditionsForProduct";
import { ICalculatedConditionsRequest } from "src/services/iclient/credits/getCalculatedConditionsForProduct/types";
import { simulateCreditConditions } from "src/services/iclient/credits/simulateCreditConditions";
import { ISimulateCreditRequest } from "src/services/iclient/credits/simulateCreditConditions/types";
import { initialMessageState } from "src/utils/messages";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
import {
  getInitialCreditContidionValidations,
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
          amount: initialValues.amount,
          cycleInterest: initialValues.cycleInterest,
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
  }, [
    accessToken,
    user.identification,
    formik.values.product.id,
    formik.values.paymentMethod,
  ]);

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
      const amount = Number(formik.values.amount);
      const periodicityInMonthsCapital = Number(
        formik.values.periodicity.periodicityInMonths,
      );
      let quotaDeadlineInMonths = Number(formik.values.deadlineTerm) || 0;
      let quotaValue = Number(formik.values.quota) || 0;

      if (quotaDeadlineInMonths !== 0) {
        quotaValue = 0;
      } else if (quotaValue !== 0) {
        quotaDeadlineInMonths = 0;
      }

      if (!productId || !paymentMethodId || !accessToken) {
        return;
      }

      const calculateConditionsRequestData: ICalculatedConditionsRequest = {
        productId,
        paymentMethodId,
        customerCode: user.identification,
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
        paymentMethodCapitalId: paymentMethodId,
        customerCode: user.identification,
        amount,
        periodicityInMonthsCapital,
        quotaDeadlineInMonths,
        quotaValue,
        rate,
      };

      const simulationResponse = await simulateCreditConditions(
        simulationRequestData,
        accessToken,
      );

      if (simulationResponse) {
        formik.setFieldValue("quota", simulationResponse.calculatedQuotaValue);
        formik.setFieldValue("maxRate", simulationResponse.rate);
        formik.setFieldValue("netValue", simulationResponse.amountToBeDrawn);
        formik.setFieldValue("hasResult", true);
        formik.setFieldValue(
          "deadline",
          simulationResponse.quotaDeadlineInMonths,
        );
        formik.setFieldValue(
          "calculatedQuotaValue",
          simulationResponse.calculatedQuotaValue,
        );
        formik.setFieldValue(
          "calculatedQuotaDeadline",
          simulationResponse.calculatedQuotaDeadline,
        );

        setDisbursementModal({
          ...disbursementModal,
          data: {
            spec: {
              amount: simulationResponse.amount,
              cycleInterest: simulationResponse.anticipatedInterest,
              discounts: simulationResponse.discountValue,
              charges: simulationResponse.chargeValue,
            },
            approximateValue: simulationResponse.amountToBeDrawn,
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
        formik.setFieldValue("quota", "");
        formik.setFieldValue("deadlineTerm", "");

        formik.setFormikState((state) => {
          return {
            ...state,
            touched: {
              ...state.touched,
              quota: false,
            },
          };
        });
      } else {
        formik.setFieldValue("quota", "");
        formik.setFieldValue("deadlineTerm", "");
      }

      formik.setFieldValue("interestRate", "");
      formik.setFieldValue("netValue", "");
      formik.setFieldValue("hasResult", false);

      formik.setFormikState((state) => {
        return {
          ...state,
          touched: {
            ...state.touched,
            deadlineTerm: false,
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

  const periodicityOptions = formik.values.periodicities.map((periodicity) => ({
    id: periodicity.id,
    value: periodicity.description || "",
  }));

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
