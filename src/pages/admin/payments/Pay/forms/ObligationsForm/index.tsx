import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import { IHelpOption } from "@components/modals/payments/PaymentHelpModal";
import { TagProps } from "@design/data/Tag";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { paymentInitialFilters } from "./config/filters";
import { ObligationsFormUI } from "./interface";
import { IObligationsEntry } from "./types";

interface ObligationsFormProps {
  initialValues: IObligationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ObligationsForm = forwardRef(function ObligationsForm(
  props: ObligationsFormProps,
  ref: React.Ref<FormikProps<IObligationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filters, setFilters] = useState<IPaymentFilters>(
    paymentInitialFilters,
  );
  const [filteredPayments, setFilteredPayments] = useState<IPayment[]>(
    initialValues.payments,
  );
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState<IHelpOption>();
  const [showTotalPaymentModal, setShowTotalPaymentModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.values.totalPayment > 0 ? onFormValid(true) : onFormValid(false);
    }
  }, [formik.values.totalPayment]);

  const handleApplyPayOption = (
    payId: string,
    option: IPaymentOption,
    applyPayOption?: IApplyPayOption,
  ) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        return {
          ...payment,
          options: payment.options.map((payOption) => {
            if (payOption.id === option.id) {
              return {
                ...payOption,
                selected: true,
                label:
                  option.id === "otherValue" ? option.label : payOption.label,
                value:
                  option.id === "otherValue" ? option.value : payOption.value,
              };
            }
            return {
              ...payOption,
              selected: false,
            };
          }),
          applyPayOption,
          valueToPay: option.value,
        };
      }
      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);
    setFilteredPayments(updatedPayments);
    formik.setFieldValue(
      "totalPayment",
      updatedPayments.reduce(
        (acc, payment) => acc + (payment.valueToPay || 0),
        0,
      ),
    );
  };

  const handleChangePaymentValue = (payId: string, option: IPaymentOption) => {
    console.log(option);
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        return {
          ...payment,
          options: payment.options.map((payOption) => {
            if (payOption.id === option.id) {
              return {
                ...payOption,
                label:
                  option.id === "otherValue" ? option.label : payOption.label,
                value:
                  option.id === "otherValue" ? option.value : payOption.value,
                selected: true,
              };
            }
            return {
              ...payOption,
              selected: false,
            };
          }),
          valueToPay: option.value,
        };
      }
      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);

    formik.setFieldValue(
      "totalPayment",
      updatedPayments.reduce(
        (acc, payment) => acc + (payment.valueToPay || 0),
        0,
      ),
    );
  };

  const handleToggleFiltersModal = () => {
    setShowFiltersModal(!showFiltersModal);
  };

  const handleApplyFilters = (filters: IPaymentFilters) => {
    const updatedFilteredPayments = initialValues.payments.filter((payment) => {
      return (
        (filters.group === "all" || payment.group === filters.group) &&
        (filters.paymentMethod === "all" ||
          payment.paymentMethod === filters.paymentMethod) &&
        (filters.status === "anywhere" || payment.status === filters.status)
      );
    });

    setFilteredPayments(updatedFilteredPayments);
    setFilters(filters);
    setShowFiltersModal(false);
  };

  const handleRemoveFilter = (filterName: string) => {
    const reducedFilters = {
      ...filters,
      [filterName]:
        paymentInitialFilters[filterName as keyof typeof paymentInitialFilters],
    };

    setFilters(reducedFilters);

    handleApplyFilters(reducedFilters);
  };

  const handleToggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  const handleApplyHelpOption = (option: IHelpOption) => {
    setSelectedHelpOption(option);
    let totalValue = 0;

    const updatedPayments = formik.values.payments.map((payment) => {
      let valueToPay = 0;

      const options = payment.options.map((payOption) => {
        let selected = false;

        if (option.id === "unselectAll" || payOption.id !== option.id) {
          selected = false;
        } else {
          selected = true;
          totalValue += payOption.value;
          valueToPay = payOption.value;
        }

        return { ...payOption, selected };
      });

      let tags: TagProps[] = [];

      if (payment.tags.find((tag) => tag.id === "payOption")) {
        tags = payment.tags.filter((tag) => tag.id !== "payOption");
      }

      return {
        ...payment,
        options,
        valueToPay,
        applyPayOption: undefined,
        tags,
      };
    });

    if (option.id === "unselectAll") {
      totalValue = 0;
    }

    formik.setFieldValue("payments", updatedPayments);
    setFilteredPayments(updatedPayments);
    formik.setFieldValue("totalPayment", totalValue);
    setShowHelpModal(false);
  };

  const handleToggleTotalModal = () => {
    setShowTotalPaymentModal(!showTotalPaymentModal);
  };

  const handleRemovePayment = (paymentId: string) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === paymentId) {
        let tags = payment.tags;

        if (payment.tags.find((tag) => tag.id === "payOption")) {
          tags = payment.tags.filter((tag) => tag.id !== "payOption");
        }

        return {
          ...payment,
          valueToPay: 0,
          options: payment.options.map((option) => ({
            ...option,
            selected: false,
          })),
          tags,
        };
      }

      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);
    setFilteredPayments(updatedPayments);

    const totalPayment = updatedPayments.reduce(
      (acc, payment) => acc + (payment.valueToPay || 0),
      0,
    );

    formik.setFieldValue("totalPayment", totalPayment);

    if (totalPayment === 0) {
      setShowTotalPaymentModal(false);
    }
  };

  const updateTotalPayment = (newTotal: number) => {
    formik.setFieldValue("totalPayment", newTotal);
  };

  return (
    <ObligationsFormUI
      formik={formik}
      filteredPayments={filteredPayments}
      showFiltersModal={showFiltersModal}
      filters={filters}
      showHelpModal={showHelpModal}
      selectedHelpOption={selectedHelpOption}
      showTotalPaymentModal={showTotalPaymentModal}
      onApplyPayOption={handleApplyPayOption}
      onChangePaymentValue={handleChangePaymentValue}
      onToggleFiltersModal={handleToggleFiltersModal}
      onApplyFilters={handleApplyFilters}
      onRemoveFilter={handleRemoveFilter}
      onToggleHelpModal={handleToggleHelpModal}
      onApplyHelpOption={handleApplyHelpOption}
      onToggleTotalModal={handleToggleTotalModal}
      onRemovePayment={handleRemovePayment}
      onUpdateTotalPayment={updateTotalPayment}
    />
  );
});

export { ObligationsForm };
export type { ObligationsFormProps };
