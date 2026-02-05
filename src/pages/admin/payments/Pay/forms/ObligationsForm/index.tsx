import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import { IPaymentFilters } from "@components/modals/payments/PaymentFilterModal";
import { IHelpOption } from "@components/modals/payments/PaymentHelpModal";
import { useAuth } from "@inube/auth";
import { ITag, useFlag } from "@inubekit/inubekit";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { captureNewError } from "src/services/errors/handleErrors";
import { getAccountsPayments } from "src/services/iclient/payments/getAccountsPayments";
import { getCardPayments } from "src/services/iclient/payments/getCardPayments";
import { getCommitmentPayments } from "src/services/iclient/payments/getCommitmentPayments";
import { getCreditPayments } from "src/services/iclient/payments/getCreditPayments";
import { mapObligations } from "../../config/mappers";
import {
  EPaymentGroupType,
  EPaymentMethodFilterType,
  EPaymentOptionType,
  EPaymentStatusType,
} from "../../types";
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
  const { accessToken } = useAuth();
  const { user, getFlag } = useContext(AppContext);

  const withNextValueOption = getFlag(
    "admin.payments.pay.next-value-payment",
  ).value;
  const withOtherValueOption = getFlag(
    "admin.payments.pay.other-value-payment",
  ).value;
  const withExpiredValueOption = getFlag(
    "admin.payments.pay.expired-value-payment",
  ).value;
  const withTotalValueOption = getFlag(
    "admin.payments.pay.total-value-payment",
  ).value;

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
  const [isLoading, setIsLoading] = useState(true);
  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    fetchObligations();
  }, [
    user.identification,
    accessToken,
    withNextValueOption,
    withOtherValueOption,
    withExpiredValueOption,
    withTotalValueOption,
  ]);

  const fetchObligations = async () => {
    if (!accessToken || !user.identification) return;

    setIsLoading(true);

    try {
      const [newCredits, newCommitments, newCards, newAccounts] =
        await Promise.all([
          getCreditPayments(
            user.identification,
            accessToken,
            withNextValueOption,
            withOtherValueOption,
            withExpiredValueOption,
            withTotalValueOption,
          ),
          getCommitmentPayments(
            user.identification,
            accessToken,
            withNextValueOption,
            withOtherValueOption,
            withExpiredValueOption,
          ),
          getCardPayments(
            user.identification,
            accessToken,
            withNextValueOption,
            withOtherValueOption,
            withExpiredValueOption,
            withTotalValueOption,
          ),
          getAccountsPayments(
            user.identification,
            accessToken,
            withNextValueOption,
            withOtherValueOption,
            withExpiredValueOption,
            withTotalValueOption,
          ),
        ]);

      const mappedObligations = mapObligations(
        newCredits,
        newCommitments,
        newCards,
        newAccounts,
      );

      formik.setFieldValue("payments", mappedObligations.payments);
      formik.setFieldValue(
        "paymentMethodFilters",
        mappedObligations.paymentMethodFilters,
      );
      setFilteredPayments(mappedObligations.payments);
    } catch (error) {
      captureNewError(
        error,
        {
          inFunction: "fetchObligations",
          action: "getPaymentsObligations",
          screen: "ObligationsForm",
          file: "src/pages/admin/payments/ObligationsForm/index.tsx",
        },
        { feature: "payment" },
      );
      addFlag({
        title: "Al parecer algo ha salido mal...",
        description:
          "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
        appearance: "danger",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setFilteredPayments(formik.values.payments);
    }
  }, [formik.values.payments, isLoading]);

  useEffect(() => {
    if (onFormValid) {
      formik.values.totalPayment > 0 ? onFormValid(true) : onFormValid(false);
    }
  }, [formik.values.totalPayment]);

  const getFilteredPayments = (payments: IPayment[]) => {
    return payments.filter((payment) => {
      return (
        (filters.group === EPaymentGroupType.ALL ||
          payment.group === filters.group) &&
        (filters.paymentMethod === EPaymentMethodFilterType.ALL ||
          payment.paymentMethodName.toLowerCase() ===
            filters.paymentMethod.toLowerCase()) &&
        (filters.status === EPaymentStatusType.ANYWHERE ||
          payment.status === filters.status)
      );
    });
  };

  const handleApplyPayOption = (
    payId: string,
    option: IPaymentOption,
    applyPayOption: IApplyPayOption,
  ) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        const tags: ITag[] = payment.tags.filter(
          (tag) => tag.id !== "payOption",
        );

        tags.push({
          id: "payOption",
          label: applyPayOption.label,
          appearance: "dark",
        });

        const options = payment.options.map((payOption) => {
          if (payOption.id === option.id && !option.isOtherValueOption) {
            return {
              ...payOption,
              selected: true,
              label: option.label,
              value: option.value,
            };
          }

          return {
            ...payOption,
            selected: false,
          };
        });

        if (option.isOtherValueOption) {
          options.push({
            id: option.id,
            label: option.label,
            value: option.value,
            isOtherValueOption: true,
            selected: true,
            hidden: true,
          });
        }

        return {
          ...payment,
          options,
          applyPayOption,
          valueToPay: option.value,
          tags,
        };
      }
      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);

    setFilteredPayments(getFilteredPayments(updatedPayments));

    formik.setFieldValue(
      "totalPayment",
      updatedPayments.reduce(
        (acc, payment) => acc + (payment.valueToPay || 0),
        0,
      ),
    );
  };

  const handleChangePaymentValue = (payId: string, option: IPaymentOption) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === payId) {
        const tags: ITag[] = payment.tags.filter(
          (tag) => tag.id !== "payOption",
        );

        return {
          ...payment,
          options: payment.options.map((payOption) => {
            if (payOption.id === option.id) {
              return {
                ...payOption,
                label: option.label,
                value: option.value,
                selected: true,
              };
            }
            return {
              ...payOption,
              selected: false,
            };
          }),
          valueToPay: option.value,
          tags,
          applyPayOption: undefined,
        };
      }
      return payment;
    });

    formik.setFieldValue("payments", updatedPayments);

    setFilteredPayments(getFilteredPayments(updatedPayments));

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
    const updatedFilteredPayments = formik.values.payments.filter((payment) => {
      return (
        (filters.group === EPaymentGroupType.ALL ||
          payment.group === filters.group) &&
        (filters.paymentMethod === EPaymentMethodFilterType.ALL ||
          payment.paymentMethodName.toLowerCase() ===
            filters.paymentMethod.toLowerCase()) &&
        (filters.status === EPaymentStatusType.ANYWHERE ||
          payment.status === filters.status)
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

        if (
          option.id === EPaymentOptionType.UNSELECT_ALL ||
          payOption.id !== option.id
        ) {
          selected = false;
        } else {
          selected = true;
          totalValue += payOption.value;
          valueToPay = payOption.value;
        }

        return { ...payOption, selected };
      });

      const tags: ITag[] = payment.tags.filter((tag) => tag.id !== "payOption");

      return {
        ...payment,
        options,
        valueToPay,
        applyPayOption: undefined,
        tags,
      };
    });

    if (option.id === EPaymentOptionType.UNSELECT_ALL) {
      totalValue = 0;
    }

    formik.setFieldValue("payments", updatedPayments);

    setFilteredPayments(getFilteredPayments(updatedPayments));
    formik.setFieldValue("totalPayment", totalValue);
    setShowHelpModal(false);
  };

  const handleToggleTotalModal = () => {
    setShowTotalPaymentModal(!showTotalPaymentModal);
  };

  const handleRemovePayment = (paymentId: string) => {
    const updatedPayments = formik.values.payments.map((payment) => {
      if (payment.id === paymentId) {
        const tags: ITag[] = payment.tags.filter(
          (tag) => tag.id !== "payOption",
        );

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

    setFilteredPayments(getFilteredPayments(updatedPayments));

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
      isLoading={isLoading}
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
