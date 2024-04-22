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
import { Tag } from "@design/data/Tag";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { MdOutlineCheckBox, MdOutlineFilterAlt } from "react-icons/md";
import { IPayment } from "src/model/entity/payment";
import { currencyFormat } from "src/utils/currency";
import { paymentFilters, paymentInitialFilters } from "./config/filters";
import { StyledTotalPayment, StyledTotalPaymentContainer } from "./styles";
import { IObligationsEntry } from "./types";

const renderFilters = (
  filters: IPaymentFilters,
  onRemove: (filterName: string) => void,
) => {
  return Object.entries(filters).map(([key, id]) => {
    const filterInitialId =
      paymentInitialFilters[key as keyof typeof paymentInitialFilters];

    const filterLabel = paymentFilters[key as keyof typeof paymentFilters].find(
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
  selectedHelpOption?: IHelpOption;
  onApplyPayOption: (
    payId: string,
    valueToPay: number,
    option?: IApplyPayOption,
  ) => void;
  onChangePaymentValue: (payId: string, valueToPay: number) => void;
  onToggleFiltersModal: () => void;
  onApplyFilters: (filters: IPaymentFilters) => void;
  onRemoveFilter: (filterName: string) => void;
  onToggleHelpModal: () => void;
  onApplyHelpOption: (option: IHelpOption) => void;
}

function ObligationsFormUI(props: ObligationsFormUIProps) {
  const {
    formik,
    filteredPayments,
    showFiltersModal,
    filters,
    showHelpModal,
    selectedHelpOption,
    onApplyPayOption,
    onChangePaymentValue,
    onToggleFiltersModal,
    onApplyFilters,
    onRemoveFilter,
    onToggleHelpModal,
    onApplyHelpOption,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

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
                {renderFilters(filters, onRemoveFilter)}
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
                  defaultSelectedOption={payment.options.find(
                    (option) => option.selected,
                  )}
                  onApplyPayOption={onApplyPayOption}
                  onChangePaymentValue={onChangePaymentValue}
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
          initialFilters={paymentInitialFilters}
          allowedFilters={paymentFilters}
          onCloseModal={onToggleFiltersModal}
          onApplyFilters={onApplyFilters}
        />
      )}
    </>
  );
}

export { ObligationsFormUI };
