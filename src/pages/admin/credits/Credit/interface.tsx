import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { NextPaymentModal } from "@components/modals/credit/NextPaymentModal";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignment,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { currencyFormat } from "src/utils/currency";
import {
  creditMovementsNormalizeEntries,
  creditMovementsTableActions,
} from "../CreditMovements/config/table";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "../MyCredits/config/tables";
import { creditBox } from "./config/credit";
import { crumbsCredit } from "./config/navigation";
import {
  extractCreditAttributes,
  formatCreditCurrencyAttrs,
} from "./config/product";
import { StyledMovementsContainer } from "./styles";
import { INextPaymentModalState, ISelectedProductState } from "./types";

interface CreditUIProps {
  isMobile?: boolean;
  selectedProduct?: ISelectedProductState;
  loading: boolean;
  productsOptions: ISelectOption[];
  credit_id?: string;
  nextPaymentModal: INextPaymentModalState;
  handleToggleNextPaymentModal: () => void;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CreditUI(props: CreditUIProps) {
  const {
    isMobile,
    selectedProduct,
    loading,
    productsOptions,
    credit_id,
    nextPaymentModal,
    handleToggleNextPaymentModal,
    handleChangeProduct,
  } = props;

  const attributes =
    selectedProduct && extractCreditAttributes(selectedProduct.credit);

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const formatedAttributes =
    attributes && formatCreditCurrencyAttrs(attributes);

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCredit(credit_id)} />
        <Title
          title="Consulta de créditos"
          subtitle="Información detallada de tus productos de crédito"
          icon={<MdArrowBack />}
          navigatePage="/my-credits"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          {selectedProduct && formatedAttributes && (
            <>
              <Select
                id="creditProducts"
                onChange={handleChangeProduct}
                label="Selección de producto"
                options={productsOptions}
                value={selectedProduct.option}
                isFullWidth
              />
              <Box
                title={selectedProduct.credit.title}
                subtitle={selectedProduct.credit.id}
                tags={selectedProduct.credit.tags}
                button={{
                  label: "Plan de pagos",
                  icon: <MdOutlineAssignment />,
                  path: `/my-credits/${credit_id}/credit-amortization`,
                  appearance: "primary",
                  variant: "filled",
                }}
                {...creditBox}
              >
                <Stack direction="column" gap="s100">
                  <Grid
                    templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                    gap="s100"
                  >
                    {formatedAttributes.slice(0, 3).map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}
                    {nextPaymentModal.data && (
                      <BoxAttribute
                        label="Total próximo pago:"
                        buttonIcon={<MdOpenInNew />}
                        buttonValue={currencyFormat(
                          nextPaymentModal.data.nextPaymentValue,
                        )}
                        onClickButton={handleToggleNextPaymentModal}
                        withButton
                      />
                    )}

                    {formatedAttributes.slice(3).map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}
                  </Grid>
                </Stack>
              </Box>
            </>
          )}

          {selectedProduct && selectedProduct.credit.movements && (
            <Stack direction="column" gap="s200" alignItems="flex-start">
              <Text type="title" size="medium">
                Últimos movimientos
              </Text>
              <StyledMovementsContainer>
                <Table
                  portalId="modals"
                  titles={movementsTableTitles}
                  breakpoints={movementsTableBreakpoints}
                  actions={creditMovementsTableActions}
                  entries={creditMovementsNormalizeEntries(
                    selectedProduct.credit.movements || [],
                  )}
                  loading={loading}
                  pageLength={selectedProduct.credit.movements?.length || 0}
                  hideMobileResume
                />
                <Button
                  type="link"
                  spacing="compact"
                  iconBefore={<MdOutlineAssignmentTurnedIn />}
                  path={`/my-credits/${credit_id}/credit-movements`}
                >
                  Movimientos
                </Button>
              </StyledMovementsContainer>
            </Stack>
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {nextPaymentModal.show && nextPaymentModal.data && (
        <NextPaymentModal
          portalId="modals"
          onCloseModal={handleToggleNextPaymentModal}
          nextPaymentData={nextPaymentModal.data}
        />
      )}
    </>
  );
}

export { CreditUI };
