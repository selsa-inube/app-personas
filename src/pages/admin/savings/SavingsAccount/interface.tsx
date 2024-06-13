import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { AttributesModal } from "@components/modals/general/AttributesModal";
import { ReimbursementModal } from "@components/modals/saving/ReimbursementModal";
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
  MdOutlineAttachMoney,
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

import { LoadingModal } from "@components/modals/general/LoadingModal";
import { RechargeModal } from "@components/modals/transfers/RechargeModal";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { IMessage } from "@ptypes/messages.types";
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
  showRechargeModal: boolean;
  loadingSend: boolean;
  message: IMessage;
  productId?: string;
  commitmentsModal: ICommitmentsModalState;
  onToggleBeneficiariesModal: () => void;
  onChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onToggleCommitmentsModal: () => void;
  onToggleReimbursementModal: () => void;
  onToggleRechargeModal: () => void;
  onSubmitRecharge: (savingAccount: string, amount: number) => void;
  onCloseMessage: () => void;
}

function SavingsAccountUI(props: SavingsAccountUIProps) {
  const {
    isMobile,
    selectedProduct,
    productsOptions,
    beneficiariesModal,
    reimbursementModal,
    showRechargeModal,
    loadingSend,
    message,
    productId,
    commitmentsModal,
    onToggleBeneficiariesModal,
    onChangeProduct,
    onToggleCommitmentsModal,
    onToggleReimbursementModal,
    onToggleRechargeModal,
    onSubmitRecharge,
    onCloseMessage,
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

  const interestPaymentValue = formatedAttributes.find(
    (attr) => attr.id === "payment_interest",
  );

  const showMovementsTable =
    selectedProduct.saving.type !== EProductType.CDAT ||
    interestPaymentValue?.value === "Periódico";

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsSaving(productId)} />
        <Title
          title="Consulta de ahorros"
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
            onChange={onChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct.option}
            isFullWidth
            readOnly={productsOptions.length === 1}
          />
          <Box
            title={selectedProduct.saving.title}
            subtitle={selectedProduct.saving.id}
            tags={selectedProduct.saving.tags}
            {...savingsAccountBox(selectedProduct.saving.type)}
            button={
              selectedProduct.saving.type === EProductType.VIEWSAVINGS
                ? {
                    label: "Depositar",
                    icon: <MdOutlineAttachMoney />,
                    onClick: onToggleRechargeModal,
                    variant: "filled",
                    appearance: "primary",
                  }
                : undefined
            }
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
                  EProductType.PROGRAMMEDSAVINGS &&
                  (reimbursementModal.data.length > 0 ? (
                    <BoxAttribute
                      label="Cuenta para reembolso:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue="Ver"
                      onClickButton={onToggleReimbursementModal}
                      withButton
                    />
                  ) : (
                    <BoxAttribute
                      label="Cuenta para reembolso:"
                      value="Sin definir"
                    />
                  ))}
                {selectedProduct.saving.type !== EProductType.VIEWSAVINGS &&
                  beneficiariesModal.data.length > 0 && (
                    <BoxAttribute
                      label="Beneficiarios:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue={beneficiariesModal.data.length}
                      onClickButton={onToggleBeneficiariesModal}
                      withButton
                    />
                  )}
                {selectedProduct.saving.type !== EProductType.CDAT &&
                  commitmentsModal.data.length > 0 && (
                    <BoxAttribute
                      label="Compromisos de ahorro:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue={commitmentsModal.data.length}
                      onClickButton={onToggleCommitmentsModal}
                      withButton
                    />
                  )}
              </Grid>
            </Stack>
          </Box>
          {showMovementsTable && (
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
          onCloseModal={onToggleReimbursementModal}
        />
      )}
      {beneficiariesModal.show && (
        <AttributesModal
          portalId="modals"
          title="Beneficiarios"
          description="Porcentaje de participación"
          onCloseModal={onToggleBeneficiariesModal}
          attributes={beneficiariesModal.data}
        />
      )}
      {commitmentsModal.show && (
        <SavingCommitmentsModal
          portalId="modals"
          onCloseModal={onToggleCommitmentsModal}
          commitments={commitmentsModal.data}
          commitmentsIcons={productsIcons}
        />
      )}
      {showRechargeModal && (
        <RechargeModal
          onCloseModal={onToggleRechargeModal}
          savingAccounts={[selectedProduct.saving]}
          onSubmit={onSubmitRecharge}
        />
      )}

      {loadingSend && (
        <LoadingModal
          title="Procesando depósito..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}

      {message.show && (
        <SectionMessage
          title={message.title}
          description={message.description}
          appearance={message.appearance}
          icon={message.icon}
          onClose={onCloseMessage}
          duration={5000}
        />
      )}
    </>
  );
}

export { SavingsAccountUI };
