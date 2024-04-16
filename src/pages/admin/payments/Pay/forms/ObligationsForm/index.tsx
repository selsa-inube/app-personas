import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import { IHelpOption } from "@components/modals/payments/PaymentHelpModal";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IPayment } from "src/model/entity/payment";
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
    option: IApplyPayOption,
    valueToPay: number,
  ) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        return {
          ...payment,
          applyPayOption: option,
          valueToPay,
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

  const handleChangePaymentValue = (payId: string, valueToPay: number) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        return {
          ...payment,
          valueToPay,
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

      return { ...payment, options, valueToPay };
    });

    if (option.id === "unselectAll") {
      totalValue = 0;
    }

    formik.setFieldValue("payments", updatedPayments);
    setFilteredPayments(updatedPayments);
    formik.setFieldValue("totalPayment", totalValue);
    setShowHelpModal(false);
  };

  return (
    <ObligationsFormUI
      formik={formik}
      filteredPayments={filteredPayments}
      showFiltersModal={showFiltersModal}
      filters={filters}
      showHelpModal={showHelpModal}
      selectedHelpOption={selectedHelpOption}
      onApplyPayOption={handleApplyPayOption}
      onChangePaymentValue={handleChangePaymentValue}
      onToggleFiltersModal={handleToggleFiltersModal}
      onApplyFilters={handleApplyFilters}
      onRemoveFilter={handleRemoveFilter}
      onToggleHelpModal={handleToggleHelpModal}
      onApplyHelpOption={handleApplyHelpOption}
    />
  );
});

export { ObligationsForm };
export type { ObligationsFormProps };
