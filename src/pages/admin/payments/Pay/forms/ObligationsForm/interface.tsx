import { PaymentCard } from "@components/cards/PaymentCard";
import { IApplyPayOption } from "@components/modals/payments/CustomValueModal";
import {
  IPaymentFilters,
  PaymentFilterModal,
} from "@components/modals/payments/PaymentFilterModal";
import {
  IHelpOption,
  PaymentHelpModal,
} from "@components/modals/payments/PaymentHelpModal";
import { PaymentTotalModal } from "@components/modals/payments/PaymentTotalModal";
import { Icon } from "@design/data/Icon";
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { ISelectOption } from "@design/input/Select/types";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import {
  MdOpenInNew,
  MdOutlineCheckBox,
  MdOutlineFilterAlt,
} from "react-icons/md";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import { paymentFilters, paymentInitialFilters } from "./config/filters";
import { StyledTotalPayment, StyledTotalPaymentContainer } from "./styles";
import { IObligationsEntry } from "./types";

const renderFilters = (
  filters: IPaymentFilters,
  allowedFilters: {
    group: ISelectOption[];
    paymentMethod: ISelectOption[];
    status: ISelectOption[];
  },
  onRemove: (filterName: string) => void,
) => {
  return Object.entries(filters).map(([key, id]) => {
    const filterInitialId =
      paymentInitialFilters[key as keyof typeof paymentInitialFilters];

    const filterLabel = allowedFilters[key as keyof typeof allowedFilters].find(
      (option) => option.id === id,
    )?.value;

    return (
      id !== filterInitialId &&
      filterLabel && (
        <Tag
          key={key}
          label={filterLabel}
          appearance="gray"
          modifier="regular"
          removable
          onRemove={() => onRemove(key)}
        />
      )
    );
  });
};

interface ObligationsFormUIProps {
  formik: FormikProps<IObligationsEntry>;
  filteredPayments: IPayment[];
  showFiltersModal: boolean;
  filters: IPaymentFilters;
  showHelpModal: boolean;
  showTotalPaymentModal: boolean;
  selectedHelpOption?: IHelpOption;
  onApplyPayOption: (
    payId: string,
    option: IPaymentOption,
    applyPayOption?: IApplyPayOption,
  ) => void;
  onChangePaymentValue: (payId: string, option: IPaymentOption) => void;
  onToggleFiltersModal: () => void;
  onApplyFilters: (filters: IPaymentFilters) => void;
  onRemoveFilter: (filterName: string) => void;
  onToggleHelpModal: () => void;
  onApplyHelpOption: (option: IHelpOption) => void;
  onToggleTotalModal: () => void;
  onRemovePayment: (paymentId: string) => void;
  onUpdateTotalPayment: (newTotal: number) => void;
}

function ObligationsFormUI(props: ObligationsFormUIProps) {
  const {
    formik,
    filteredPayments,
    showFiltersModal,
    filters,
    showHelpModal,
    showTotalPaymentModal,
    selectedHelpOption,
    onApplyPayOption,
    onChangePaymentValue,
    onToggleFiltersModal,
    onApplyFilters,
    onRemoveFilter,
    onToggleHelpModal,
    onApplyHelpOption,
    onToggleTotalModal,
    onRemovePayment,
    onUpdateTotalPayment,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const selectedPayments = formik.values.payments.filter(
    (payment) => payment.valueToPay && payment.valueToPay > 0,
  );

  return (
    <>
      <form>
        <Stack direction="column" gap={isMobile ? "s300" : "s400"}>
          <Stack direction="column" gap="s200">
            <Stack
              gap="s150"
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                spacing="compact"
                variant="outlined"
                iconBefore={<MdOutlineCheckBox />}
                onClick={onToggleHelpModal}
              >
                Ayudas
              </Button>
              <Button
                spacing="compact"
                iconBefore={<MdOutlineFilterAlt />}
                onClick={onToggleFiltersModal}
              >
                Filtros
              </Button>
            </Stack>

            <Fieldset title="Filtros aplicados">
              <Stack direction="row" gap="s150">
                {renderFilters(
                  filters,
                  paymentFilters(formik.values.paymentMethodFilters),
                  onRemoveFilter,
                )}
              </Stack>
            </Fieldset>
          </Stack>

          <Stack
            direction="column"
            gap="s300"
            margin={isMobile ? "0 0 130px 0" : "0"}
          >
            <Grid
              templateColumns={isTablet ? "1fr" : "1fr 1fr"}
              gap={isMobile ? "s200" : "s300"}
            >
              {filteredPayments.map((payment: IPayment) => (
                <PaymentCard
                  key={payment.id}
                  id={payment.id}
                  title={payment.title}
                  options={payment.options}
                  tags={payment.tags}
                  allowCustomValue={formik.values.allowCustomValue}
                  selectedOption={payment.options.find(
                    (option) => option.selected,
                  )}
                  onApplyPayOption={onApplyPayOption}
                  onChangePaymentValue={onChangePaymentValue}
                  onRemovePayment={onRemovePayment}
                />
              ))}
            </Grid>

            <StyledTotalPaymentContainer fixed={isMobile}>
              <Divider dashed />

              <Stack justifyContent="flex-end" width="100%">
                <StyledTotalPayment isMobile={isMobile}>
                  <Text type="title" size="small">
                    Total a pagar hoy:
                  </Text>
                  <Text type="body" size="medium">
                    {currencyFormat(formik.values.totalPayment)}
                  </Text>
                  <Icon
                    icon={<MdOpenInNew />}
                    appearance="primary"
                    size="20px"
                    cursorHover
                    disabled={(formik.values.totalPayment || 0) === 0}
                    onClick={onToggleTotalModal}
                  />
                </StyledTotalPayment>
              </Stack>
            </StyledTotalPaymentContainer>
          </Stack>
        </Stack>
      </form>

      {showHelpModal && (
        <PaymentHelpModal
          onCloseModal={onToggleHelpModal}
          onApplyOption={onApplyHelpOption}
          currentOption={selectedHelpOption}
        />
      )}

      {showFiltersModal && (
        <PaymentFilterModal
          initialFilters={
            JSON.stringify(filters) === JSON.stringify(paymentInitialFilters)
              ? paymentInitialFilters
              : filters
          }
          allowedFilters={paymentFilters(formik.values.paymentMethodFilters)}
          onCloseModal={onToggleFiltersModal}
          onApplyFilters={onApplyFilters}
        />
      )}

      {showTotalPaymentModal && (
        <PaymentTotalModal
          onCloseModal={onToggleTotalModal}
          totalPayment={formik.values.totalPayment}
          selectedPayments={selectedPayments}
          onRemovePayment={onRemovePayment}
          onUpdateTotalPayment={onUpdateTotalPayment}
        />
      )}
    </>
  );
}

export { ObligationsFormUI };
