import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { AttributesModal } from "@components/modals/general/AttributesModal";
import { ReimbursementModal } from "@components/modals/saving/ReimbursementModal";
import { SavingCommitmentsModal } from "@components/modals/saving/SavingCommitmentsModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAdd,
  MdOutlineAssignmentTurnedIn,
  MdOutlineAttachMoney,
} from "react-icons/md";
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

import { RecordCard } from "@components/cards/RecordCard";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { LoadingModal } from "@components/modals/general/LoadingModal";
import { ActionsModal } from "@components/modals/saving/ActionsModal";
import { ChangeQuotaModal } from "@components/modals/saving/ChangeQuotaModal";
import { ModifyActionModal } from "@components/modals/saving/ModifyActionModal";
import { RechargeModal } from "@components/modals/transfers/RechargeModal";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useContext } from "react";
import { AppContext } from "src/context/app";
import { shareMaturityDM } from "src/model/domains/savings/shareMaturityDM";
import {
  EMovementType,
  EProductType,
  IMovement,
} from "src/model/entity/product";
import { extractAttribute } from "src/utils/products";
import { generateAttributes } from "./config/attributeRecord";
import {
  extractSavingAttributes,
  formatSavingCurrencyAttrs,
} from "./config/product";

const renderMovements = (movements: IMovement[]) =>
  movements &&
  movements.slice(0, 5).map((movement, index) => (
    <Stack direction="column" gap={inube.spacing.s200} key={movement.id}>
      {index !== 0 && <Divider dashed />}
      <RecordCard
        id={movement.id}
        type={movement.type || EMovementType.CREDIT}
        description={movement.description}
        value={movement.totalValue || 0}
        attributes={generateAttributes(movement)}
      />
    </Stack>
  ));

interface SavingsAccountUIProps {
  isMobile: boolean;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  beneficiariesModal: IBeneficiariesModalState;
  reimbursementModal: IReimbursementModalState;
  showRechargeModal: boolean;
  loadingSend: boolean;
  productId?: string;
  commitmentsModal: ICommitmentsModalState;
  withTransfers: boolean;
  showActionsModal: boolean;
  showChangeQuotaModal: boolean;
  showModifyActionModal: boolean;
  showCancelSavingModal: boolean;
  onToggleBeneficiariesModal: () => void;
  onChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onToggleCommitmentsModal: () => void;
  onToggleReimbursementModal: () => void;
  onToggleRechargeModal: () => void;
  onSubmitRecharge: (savingAccount: string, amount: number) => void;
  onToggleActionsModal: () => void;
  onChangeQuota: () => void;
  onModifyAction: () => void;
  onCancelSaving: () => void;
  onToggleChangeQuotaModal: () => void;
  onToggleModifyActionModal: () => void;
  onToggleCancelSavingModal: () => void;
  onDownloadCertificate: () => void;
  onShareCertificate: () => void;
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
    productId,
    commitmentsModal,
    withTransfers,
    showActionsModal,
    showChangeQuotaModal,
    showModifyActionModal,
    showCancelSavingModal,
    onToggleBeneficiariesModal,
    onChangeProduct,
    onToggleCommitmentsModal,
    onToggleReimbursementModal,
    onToggleRechargeModal,
    onSubmitRecharge,
    onToggleActionsModal,
    onChangeQuota,
    onModifyAction,
    onCancelSaving,
    onToggleChangeQuotaModal,
    onToggleModifyActionModal,
    onToggleCancelSavingModal,
    onDownloadCertificate,
    onShareCertificate,
  } = props;
  const { getFlag } = useContext(AppContext);

  const withChangeQuotaOption = getFlag(
    "admin.savings.programmed-savings.modal-option-change-quota",
  ).value;

  const withModifyActionOption = getFlag(
    "admin.savings.programmed-savings.modal-option-modify-action",
  ).value;

  const withCancelSavingOption = getFlag(
    "admin.savings.programmed-savings.modal-option-cancel-saving",
  ).value;

  const withDownloadCertificateOption = getFlag(
    "admin.savings.cdat.modal-option-download-certificate",
  ).value;

  const withShareCertificateOption = getFlag(
    "admin.savings.cdat.modal-option-share-certificate",
  ).value;

  const withCancelInvestmentOption = getFlag(
    "admin.savings.cdat.modal-option-cancel-investment",
  ).value;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const attributes =
    selectedProduct && extractSavingAttributes(selectedProduct.saving);

  const formatedAttributes =
    attributes &&
    formatSavingCurrencyAttrs(attributes, selectedProduct.saving.type);

  const netValue = extractAttribute(attributes, "net_value");

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

  const showMovements =
    selectedProduct.saving.type !== EProductType.CDAT ||
    interestPaymentValue?.value === "Periódico";

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
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
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s300}>
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
              withTransfers &&
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
            <Stack direction="column" gap={inube.spacing.s100}>
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                gap={inube.spacing.s100}
                autoRows="auto"
              >
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
            <Stack justifyContent="flex-end" width="100%">
              {(selectedProduct.saving.type ===
                EProductType.PROGRAMMEDSAVINGS &&
                (withChangeQuotaOption ||
                  withModifyActionOption ||
                  withCancelSavingOption)) ||
              (selectedProduct.saving.type === EProductType.CDAT &&
                (withDownloadCertificateOption ||
                  withShareCertificateOption ||
                  withCancelInvestmentOption)) ? (
                <Button
                  iconBefore={<MdOutlineAdd />}
                  spacing="compact"
                  onClick={onToggleActionsModal}
                >
                  Acciones
                </Button>
              ) : null}
            </Stack>
          </Box>
          {showMovements && (
            <Stack
              direction="column"
              gap={inube.spacing.s300}
              alignItems="flex-start"
            >
              <Text type="title" size="medium">
                {selectedProduct.saving.type === EProductType.CDAT
                  ? "Pago de intereses"
                  : "Últimos movimientos"}
              </Text>
              <StyledMovementsContainer $isMobile={isMobile}>
                <Stack direction="column" gap={inube.spacing.s200} width="100%">
                  {selectedProduct.saving.movements &&
                  selectedProduct.saving.movements.length > 0 ? (
                    renderMovements(selectedProduct.saving.movements)
                  ) : (
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      gap={inube.spacing.s100}
                    >
                      <Text type="title" size="small" appearance="dark">
                        No tienes movimientos
                      </Text>
                      <Text
                        type="body"
                        size={isMobile ? "small" : "medium"}
                        appearance="gray"
                      >
                        Aun no posees movimientos en este producto.
                      </Text>
                    </Stack>
                  )}
                </Stack>
              </StyledMovementsContainer>
              <Stack justifyContent="flex-end" width="100%">
                <Button
                  spacing="compact"
                  iconBefore={<MdOutlineAssignmentTurnedIn />}
                  path={`/my-savings/account/${productId}/movements`}
                  disabled={
                    !selectedProduct.saving.movements ||
                    selectedProduct.saving.movements.length === 0
                  }
                  type="link"
                >
                  Movimientos
                </Button>
              </Stack>
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
      {showActionsModal && (
        <ActionsModal
          productType={selectedProduct.saving.type}
          onCloseModal={onToggleActionsModal}
          onChangeQuota={onToggleChangeQuotaModal}
          onModifyAction={onToggleModifyActionModal}
          onCancelSaving={onToggleCancelSavingModal}
          onDownload={onDownloadCertificate}
          onShare={onShareCertificate}
        />
      )}
      {showChangeQuotaModal && (
        <ChangeQuotaModal
          onCloseModal={onToggleChangeQuotaModal}
          totalBalance={Number(netValue?.value || 0)}
          paymentMethod="debit"
          paymentMethodName="Debito automático"
          onConfirm={onChangeQuota}
        />
      )}
      {showModifyActionModal && (
        <ModifyActionModal
          portalId="modals"
          shareMaturity={shareMaturityDM.PAYMENT.id}
          onCloseModal={onToggleModifyActionModal}
          onConfirm={onModifyAction}
        />
      )}
      {showCancelSavingModal && (
        <DecisionModal
          portalId="modals"
          title="Cancelar ahorro por anticipado"
          description="¿Estas seguro? Analizaremos tu solicitud y determinaremos las condiciones para la cancelación."
          actionText="Cancelar"
          appearance="danger"
          cancelText="Continuar"
          onClick={onCancelSaving}
          onCloseModal={onToggleCancelSavingModal}
        />
      )}

      {loadingSend && (
        <LoadingModal
          title="Procesando depósito..."
          message="Espera unos segundos, estamos procesando la transacción."
        />
      )}
    </>
  );
}

export { SavingsAccountUI };
