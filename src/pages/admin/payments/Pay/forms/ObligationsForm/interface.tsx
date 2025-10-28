import { PaymentCard } from "@components/cards/payments/PaymentCard";
import { Totalizer } from "@components/layout/Totalizer";
import { IApplyPayOption } from "@components/modals/payments/CustomValueModal/utils";
import {
  IPaymentFilters,
  PaymentFilterModal,
} from "@components/modals/payments/PaymentFilterModal";
import {
  IHelpOption,
  PaymentHelpModal,
} from "@components/modals/payments/PaymentHelpModal";
import { PaymentTotalModal } from "@components/modals/payments/PaymentTotalModal";
import { inube } from "@design/tokens";
import { useMediaQueries } from "@hooks/useMediaQueries";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Button,
  Divider,
  Grid,
  IOption,
  Message,
  SkeletonLine,
  Stack,
  Tag,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { useContext } from "react";
import { MdOutlineCheckBox, MdOutlineFilterAlt } from "react-icons/md";
import { AppContext } from "src/context/app";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { paymentCardsBreakpoints } from "./config/cards";
import { getPaymentFilters, paymentInitialFilters } from "./config/filters";
import { StyledFiltersContainer, StyledTotalPaymentContainer } from "./styles";
import { IObligationsEntry } from "./types";

const renderFilters = (
  filters: IPaymentFilters,
  allowedFilters: {
    group: IOption[];
    paymentMethod: IOption[];
    status: IOption[];
  },
  onRemove: (filterName: string) => void,
) => {
  return Object.entries(filters).map(([key, id]) => {
    const filterInitialId =
      paymentInitialFilters[key as keyof typeof paymentInitialFilters];

    const filterLabel = allowedFilters[key as keyof typeof allowedFilters].find(
      (option) => option.id === id,
    )?.label;

    return (
      id !== filterInitialId &&
      filterLabel && (
        <Tag
          key={key}
          label={filterLabel}
          appearance="gray"
          removable
          onClose={() => onRemove(key)}
        />
      )
    );
  });
};

function RenderComponentInSkeleton({ isMobile, cardsRender, cardsPerRow }: { isMobile: boolean, cardsRender: number, cardsPerRow: number }) {
  return (
    <Stack
      direction="column"
      gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
    >
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack
          gap={inube.spacing.s150}
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
        >
          <SkeletonLine animated width="10%" />
          <SkeletonLine animated width="5%" />
        </Stack>
      </Stack>
      <Stack
        direction="column"
        gap={inube.spacing.s300}
        margin={isMobile ? "0 0 130px 0" : "0"}
      >
        <Grid
          templateColumns={`repeat(${cardsPerRow}, minmax(262px, 1fr))`}
          gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
          autoRows="auto"
        >
          {
            new Array(cardsRender).fill(0).map((_, index) => (
              <Stack
                direction="column"
                padding={inube.spacing.s300}
                gap={inube.spacing.s200}
                width="100%"
                key={index}
              >
                <SkeletonLine animated width="80%" />
                <SkeletonLine animated width="60%" />
                <Stack direction="column" gap={inube.spacing.s100}>
                  <SkeletonLine animated width="100%" />
                  <SkeletonLine animated width="100%" />
                  <SkeletonLine animated width="100%" />
                </Stack>
                <SkeletonLine animated width="40%" />
              </Stack>
            ))
          }
        </Grid>
        <StyledTotalPaymentContainer $fixed={isMobile}>
          <Divider dashed />

          <Stack justifyContent="flex-end" width="100%">
            <SkeletonLine animated width="30%" />
          </Stack>
        </StyledTotalPaymentContainer>
      </Stack>
    </Stack>
  )
}

interface ObligationsFormUIProps {
  formik: FormikProps<IObligationsEntry>;
  filteredPayments: IPayment[];
  showFiltersModal: boolean;
  filters: IPaymentFilters;
  isLoading: boolean;
  showHelpModal: boolean;
  showTotalPaymentModal: boolean;
  selectedHelpOption?: IHelpOption;
  onApplyPayOption: (
    payId: string,
    option: IPaymentOption,
    applyPayOption: IApplyPayOption,
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
    isLoading,
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
  const { getFlag } = useContext(AppContext);

  const isMobile = useMediaQuery("(max-width: 700px)");

  const cardsQueries = Object.keys(paymentCardsBreakpoints);
  const cardsMediaQueries = useMediaQueries(cardsQueries);

  const indexQuery = cardsQueries.findLastIndex(
    (query) => cardsMediaQueries[query] === true,
  );

  const cardsPerRow = paymentCardsBreakpoints[cardsQueries[indexQuery]];

  const selectedPayments = formik.values.payments.filter(
    (payment) => payment.valueToPay && payment.valueToPay > 0,
  );

  const withInsurances = getFlag(
    "admin.filters.payments.insurances-payments",
  ).value;

  const withAccountsPayable = getFlag(
    "admin.filters.payments.accounts-payable-payments",
  ).value;

  const withCreditQuotas = getFlag(
    "admin.filters.payments.credit-quotas-payments",
  ).value;

  const paymentFilters = getPaymentFilters(
    formik.values.paymentMethodFilters,
    withInsurances,
    withAccountsPayable,
    withCreditQuotas,
  );

  if (isLoading) {
    return (
      <RenderComponentInSkeleton
        cardsRender={5}
        isMobile={isMobile}
        cardsPerRow={cardsPerRow}
      />
    )
  }

  return filteredPayments.length > 0 ?
    (
      <>
        <form>
          <Stack
            direction="column"
            gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
          >
            <Stack direction="column" gap={inube.spacing.s200}>
              <Stack
                gap={inube.spacing.s150}
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
                  Selección múltiple
                </Button>
                <Button
                  spacing="compact"
                  iconBefore={<MdOutlineFilterAlt />}
                  onClick={onToggleFiltersModal}
                >
                  Filtros
                </Button>
              </Stack>

              <StyledFiltersContainer>
                <Text type="title" size="small" weight="bold">
                  Filtros:
                </Text>
                <Stack
                  direction="row"
                  gap={inube.spacing.s150}
                  alignItems="center"
                >
                  {renderFilters(filters, paymentFilters, onRemoveFilter)}
                </Stack>
              </StyledFiltersContainer>
            </Stack>

            <Stack
              direction="column"
              gap={inube.spacing.s300}
              margin={isMobile ? "0 0 130px 0" : "0"}
            >
              <Grid
                templateColumns={`repeat(${cardsPerRow}, minmax(262px, 1fr))`}
                gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
                autoRows="auto"
              >
                {filteredPayments.map((payment: IPayment) => (
                  <PaymentCard
                    key={payment.id}
                    id={payment.id}
                    title={payment.title}
                    options={payment.options}
                    tags={payment.tags}
                    lineCode={payment.lineCode || ""}
                    allowCustomValue={payment.allowCustomValue}
                    selectedOption={payment.options.find(
                      (option) => option.selected,
                    )}
                    onApplyPayOption={onApplyPayOption}
                    onChangePaymentValue={onChangePaymentValue}
                    onRemovePayment={onRemovePayment}
                  />
                ))}
              </Grid>

              <StyledTotalPaymentContainer $fixed={isMobile}>
                <Divider dashed />

                <Stack justifyContent="flex-end" width="100%">
                  <Totalizer
                    isMobile={isMobile}
                    isExpandable={true}
                    disabled={(formik.values.totalPayment || 0) === 0}
                    onClick={onToggleTotalModal}
                    value={formik.values.totalPayment}
                  />
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
            allowedFilters={paymentFilters}
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
    ) : (<Message
      size="large"
      appearance="help"
      title="Actualmente no tienes obligaciones pendientes por pagar."
      fullwidth
    />)
}

export { ObligationsFormUI };
