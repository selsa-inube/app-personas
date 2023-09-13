import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { AttributesModal } from "@components/modals/AttributesModal";
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
import { StyledMovementsContainer } from "@pages/admin/credits/Credit/styles";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignmentTurnedIn,
  MdOutlinePaid,
} from "react-icons/md";
import {
  investmentMovementsTableActions,
  investmentMovementsTableBreakpoints,
  investmentMovementsTableTitles,
} from "../InvestmentMovements/config/table";
import { investmentBox } from "./config/investment";
import { crumbsInvestment } from "./config/navigation";
import {
  extractInvestmentAttributes,
  formatInvestmentCurrencyAttrs,
} from "./config/product";
import { IModalState, ISelectedProductState } from "./types";
import { ReimbursementModal } from "@components/modals/investment/ReimbursementModal";

interface InvestmentUIProps {
  isMobile?: boolean;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  modals: IModalState;
  productId?: string;
  handleChangeProduct: (option: ISelectOption) => void;
  handleToggleBeneficiariesModal: () => void;
  handleToggleRefundModal: () => void;
}

function InvestmentUI(props: InvestmentUIProps) {
  const {
    isMobile,
    selectedProduct,
    productsOptions,
    productId,
    modals,
    handleToggleBeneficiariesModal,
    handleToggleRefundModal,
    handleChangeProduct,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  const attributes = extractInvestmentAttributes(selectedProduct.investment);

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsInvestment(productId)} />
        <Title
          title="Consulta de inversiones"
          subtitle="Información detallada de tus productos de inversión"
          icon={<MdArrowBack />}
          navigatePage="/my-investments"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          mquery ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Select
            id="investmentProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct.option}
            inputSize={isMobile ? "compact" : "wide"}
            isFullWidth
          />
          <Box
            title={selectedProduct.investment.title}
            subtitle={selectedProduct.investment.id}
            tags={selectedProduct.investment.tags}
            button={{
              label: "Compromisos de ahorro",
              icon: <MdOutlinePaid />,
              path: ``,
            }}
            {...investmentBox(selectedProduct.investment.type)}
          >
            <Stack direction="column" gap="s100">
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                {selectedProduct.investment.type === "CD" && (
                  <BoxAttribute
                    key="titleAttr"
                    label="Titulo:"
                    value={selectedProduct.investment.id}
                  />
                )}

                {formatInvestmentCurrencyAttrs(
                  attributes,
                  selectedProduct.investment.type
                ).map((attr) => (
                  <BoxAttribute
                    key={attr.id}
                    label={`${attr.label}: `}
                    value={attr.value}
                  />
                ))}

                {selectedProduct.investment.type === "AP" && (
                  <BoxAttribute
                    label="Reembolso:"
                    buttonIcon={<MdOpenInNew />}
                    buttonValue="Ver"
                    onClickButton={handleToggleRefundModal}
                    withButton
                  />
                )}

                <BoxAttribute
                  label="Beneficiarios:"
                  buttonIcon={<MdOpenInNew />}
                  buttonValue={modals.dataBeneficiaries.length}
                  onClickButton={handleToggleBeneficiariesModal}
                  withButton
                />
              </Grid>
            </Stack>
          </Box>

          {selectedProduct.investment.type === "AP" && (
            <Stack direction="column" gap="s200" alignItems="flex-start">
              <Text type="title" size="medium">
                Últimos movimientos
              </Text>
              <StyledMovementsContainer>
                <Table
                  id="modals"
                  titles={investmentMovementsTableTitles}
                  breakpoints={investmentMovementsTableBreakpoints}
                  actions={investmentMovementsTableActions}
                  entries={selectedProduct.investment.movements || []}
                  pageLength={selectedProduct.investment.movements?.length || 0}
                  hideMobileResume
                />
                <Button
                  type="link"
                  appearance="dark"
                  variant="none"
                  iconBefore={<MdOutlineAssignmentTurnedIn />}
                  path={`/my-investments/${productId}/movements`}
                >
                  Movimientos
                </Button>
              </StyledMovementsContainer>
            </Stack>
          )}
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
      {modals.showRefund && (
        <ReimbursementModal
          portalId="modals"
          reimbursement={modals.dataRefund}
          onCloseModal={handleToggleRefundModal}
        />
      )}
      {modals.showBeneficiaries && (
        <AttributesModal
          portalId="modals"
          title="Beneficiarios"
          description="Porcentaje de participación"
          onCloseModal={handleToggleBeneficiariesModal}
          attributes={modals.dataBeneficiaries}
        />
      )}
    </>
  );
}

export { InvestmentUI };
