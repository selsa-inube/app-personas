import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { CreditConditionsFormUI } from "./interface";
import { ICreditConditionsEntry, IDisbursementModalState } from "./types";
import {
  getInitialCreditContidionValidations,
  validationSchema,
} from "./utils";
import { useAuth } from "@inube/auth";
import { AppContext } from "src/context/app";
import { getPaymentMethodsForUser } from "src/services/iclient/credits/getPaymentMethods";
import { getPeriodicityForUser } from "src/services/iclient/credits/getPeriodicity";
import { getConditionsCalculation } from "src/services/iclient/credits/getConditionsCalculation";
import { getSimulation } from "src/services/iclient/credits/getSimulation";

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
    formik.validateForm().then((errors) => {
      onFormValid(Object.keys(errors).length === 0);
    });
  }, [formik.values]);

  useEffect(() => {
    setDynamicValidationSchema(getInitialCreditContidionValidations(formik));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const products = await getPaymentMethodsForUser(
          user.identification,
          accessToken,
          formik.values.product.id,
        );
        formik.setFieldValue("paymentMethods", products);

        if (formik.values.paymentMethod) {
          const periodicities = await getPeriodicityForUser(
            accessToken,
            formik.values.product.id,
            formik.values.paymentMethod.id,
          );
          formik.setFieldValue("periodicities", periodicities);
        }
      }
    };

    fetchData();
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

    const methods = await getPaymentMethodsForUser(
      user.identification,
      accessToken,
      formik.values.product.id,
    );

    if (methods.length > 0) {
      formik.setFieldValue("paymentMethods", methods);
    }
  };

  const handleChangePeriodicity = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    if (!accessToken || !formik.values.paymentMethod) return;

    const selectedPeriodicity = formik.values.periodicities.find(
      (periodicity) => periodicity.code === value,
    );

    if (selectedPeriodicity) {
      formik.setFieldValue("periodicity", {
        code: selectedPeriodicity.code,
        description: selectedPeriodicity.description,
        periodicityInMonths: selectedPeriodicity.periodicityInMonths,
        periodicityInDays: selectedPeriodicity.periodicityInDays,
      });
    }

    const periodicities = await getPeriodicityForUser(
      accessToken,
      formik.values.product.id,
      formik.values.paymentMethod.id,
    );

    if (periodicities.length > 0) {
      formik.setFieldValue("periodicities", periodicities);
    }
  };

  
  const simulateCredit = async () => {
    setLoadingSimulation(true);
    try {
      const productId = formik.values.product?.id;
      const paymentMethodId = formik.values.paymentMethod?.id;
      const customerCode = user.identification;
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

      const calculationResponse = await getConditionsCalculation(
        {
          productId,
          paymentMethodId,
          customerCode,
          amount,
        },
        accessToken,
      );

      const rate = calculationResponse?.rate ?? 0;

      const simulationResponse = await getSimulation(
        {
          productId,
          paymentMethodCapitalId: paymentMethodId,
          customerCode,
          amount,
          periodicityInMonthsCapital,
          quotaDeadlineInMonths,
          quotaValue,
          rate,
        },
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
    } catch (error) {
      console.error("Error during simulation:", error);
    } finally {
      setLoadingSimulation(false);
      onFormValid(true);
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

  return (
    <CreditConditionsFormUI
      loading={loading}
      formik={formik}
      loadingSimulation={loadingSimulation}
      disbursementModal={disbursementModal}
      simulateCredit={simulateCredit}
      customHandleChange={customHandleChange}
      onFormValid={onFormValid}
      onToggleDisbursementModal={handleToggleDisbursementModal}
      onChangePaymentMethod={handleChangePaymentMethod}
      onChangePeriodicity={handleChangePeriodicity}
    />
  );
});

export { CreditConditionsForm };
export type { CreditConditionsFormProps };
