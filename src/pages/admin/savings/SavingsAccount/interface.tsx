import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { AttributesModal } from "@components/modals/AttributesModal";
import { ReimbursementModal } from "@components/modals/investment/ReimbursementModal";
import { SavingCommitmentsModal } from "@components/modals/saving/SavingCommitmentsModal";
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
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import {
  savingAccountMovementsNormalizeEntries,
  savingsAccountMovementsTableActions,
  savingsAccountMovementsTableBreakpoints,
  savingsAccountMovementsTableTitles,
} from "../SavingsAccountMovements/config/table";
import { crumbsSaving } from "./config/navigation";
import {
  investmentCommitmentsIcons,
  savingCommitmentsIcons,
  savingsAccountBox,
} from "./config/saving";
import { StyledMovementsContainer } from "./styles";
import {
  IBeneficiariesModalState,
  ICommitmentsModalState,
  IReimbursementModalState,
  ISelectedProductState,
} from "./types";

import { EProductType } from "src/model/entity/product";
import {
  extractSavingAttributes,
  formatSavingCurrencyAttrs,
} from "./config/product";

interface SavingsAccountUIProps {
  isMobile?: boolean;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  beneficiariesModal: IBeneficiariesModalState;
  reimbursementModal: IReimbursementModalState;
  productId?: string;
  handleToggleBeneficiariesModal: () => void;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  commitmentsModal: ICommitmentsModalState;
  handleToggleCommitmentsModal: () => void;
  handleToggleReimbursementModal: () => void;
}

function SavingsAccountUI(props: SavingsAccountUIProps) {
  const {
    isMobile,
    selectedProduct,
    productsOptions,
    beneficiariesModal,
    reimbursementModal,
    productId,
    handleToggleBeneficiariesModal,
    handleChangeProduct,
    commitmentsModal,
    handleToggleCommitmentsModal,
    handleToggleReimbursementModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const attributes =
    selectedProduct && extractSavingAttributes(selectedProduct.saving);

  const formatedAttributes =
    attributes &&
    formatSavingCurrencyAttrs(attributes, selectedProduct.saving.type);

  const productsIcons = {
    ...savingCommitmentsIcons,
    ...investmentCommitmentsIcons,
  };

  const isInvestment =
    selectedProduct.saving.type === EProductType.CDAT ||
    selectedProduct.saving.type === EProductType.PROGRAMMEDSAVINGS;

  const attributesWithInterestPayment = formatedAttributes.filter(
    (attr) => attr.id === "payment_interest" && attr.value === "Periódico",
  );

  const showTable =
    selectedProduct.saving.type !== EProductType.CDAT ||
    attributesWithInterestPayment.length > 0;

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsSaving(isInvestment, productId)} />
        <Title
          title={
            isInvestment ? "Consulta de inversiones" : "Consulta de ahorros"
          }
          subtitle={
            isInvestment
              ? "Información detallada de tus productos de inversión"
              : "Información detallada de tus productos de ahorro"
          }
          icon={<MdArrowBack />}
          navigatePage="/my-savings"
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
          <Select
            id="savingProducts"
            onChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct.option}
            isFullWidth
          />
          <Box
            title={selectedProduct.saving.title}
            subtitle={selectedProduct.saving.id}
            tags={selectedProduct.saving.tags}
            {...savingsAccountBox(selectedProduct.saving.type)}
          >
            <Stack direction="column" gap="s100">
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                {formatedAttributes.map((attr) => (
                  <BoxAttribute
                    key={attr.id}
                    label={`${attr.label}: `}
                    value={attr.value}
                  />
                ))}
                {selectedProduct.saving.type ===
                  EProductType.PROGRAMMEDSAVINGS && (
                  <BoxAttribute
                    label="Cuenta para reembolso:"
                    buttonIcon={<MdOpenInNew />}
                    buttonValue="Ver"
                    onClickButton={handleToggleReimbursementModal}
                    withButton
                  />
                )}
                {selectedProduct.saving.type !== EProductType.VIEWSAVINGS && (
                  <BoxAttribute
                    label="Beneficiarios:"
                    buttonIcon={<MdOpenInNew />}
                    buttonValue={beneficiariesModal.data.length}
                    onClickButton={handleToggleBeneficiariesModal}
                    withButton
                  />
                )}
                {selectedProduct.saving.type !== EProductType.CDAT && (
                  <BoxAttribute
                    label="Compromisos de ahorro:"
                    buttonIcon={<MdOpenInNew />}
                    buttonValue={commitmentsModal.data.length}
                    onClickButton={handleToggleCommitmentsModal}
                    withButton
                  />
                )}
              </Grid>
            </Stack>
          </Box>
          {showTable && (
            <Stack direction="column" gap="s200" alignItems="flex-start">
              <Text type="label" size="large">
                {selectedProduct.saving.type === EProductType.CDAT
                  ? "Pago de intereses"
                  : "Últimos movimientos"}
              </Text>
              <StyledMovementsContainer>
                <Table
                  portalId="modals"
                  titles={savingsAccountMovementsTableTitles}
                  breakpoints={savingsAccountMovementsTableBreakpoints}
                  actions={savingsAccountMovementsTableActions}
                  entries={savingAccountMovementsNormalizeEntries(
                    selectedProduct.saving.movements || [],
                  ).slice(0, 5)}
                  pageLength={selectedProduct.saving.movements?.length || 0}
                  hideMobileResume
                />
                <Button
                  spacing="compact"
                  iconBefore={<MdOutlineAssignmentTurnedIn />}
                  path={`/my-savings/account/${productId}/movements`}
                  type="link"
                >
                  Movimientos
                </Button>
              </StyledMovementsContainer>
            </Stack>
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {reimbursementModal.show && (
        <ReimbursementModal
          portalId="modals"
          reimbursement={reimbursementModal.data}
          onCloseModal={handleToggleReimbursementModal}
        />
      )}
      {beneficiariesModal.show && (
        <AttributesModal
          portalId="modals"
          title="Beneficiarios"
          description="Porcentaje de participación"
          onCloseModal={handleToggleBeneficiariesModal}
          attributes={beneficiariesModal.data}
        />
      )}
      {commitmentsModal.show && (
        <SavingCommitmentsModal
          portalId="modals"
          onCloseModal={handleToggleCommitmentsModal}
          commitments={commitmentsModal.data}
          commitmentsIcons={productsIcons}
        />
      )}
    </>
  );
}

export { SavingsAccountUI };
