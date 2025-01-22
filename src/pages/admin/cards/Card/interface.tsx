import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { HandlingFeeModal } from "@components/modals/cards/HandlingFeeModal";
import { SavingAccountsModal } from "@components/modals/cards/SavingAccountsModal";
import { UsedQuotaModal } from "@components/modals/cards/UsedQuotaModal";
import { InfoModal } from "@components/modals/general/InfoModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Icon,
  Stack,
  Text,
} from "@inubekit/inubekit";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignmentTurnedIn,
  MdOutlineDescription,
  MdQuestionMark,
} from "react-icons/md";
import { EMovementType, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { extractAttribute } from "src/utils/products";
import { IUsedQuotaModalState } from "../CreditQuota/types";
import { generateAttributes } from "./config/attributeRecord";
import { cardBox, myQuotas } from "./config/card";
import { infoModalData } from "./config/modals";
import { crumbsCard } from "./config/navigation";
import {
  extractCardAttributes,
  extractCreditQuotasAttributes,
  formatCardCurrencyAttrs,
  formatCreditQuotasCurrencyAttrs,
} from "./config/product";
import {
  IHandlingFeeModal,
  IMovementsInfoModal,
  ISavingAccountsModal,
  ISelectedProductState,
} from "./types";

interface CardUIProps {
  cardId?: string;
  showMovementsInfoModal: IMovementsInfoModal;
  selectedProduct: ISelectedProductState;
  savingAccountsModal: ISavingAccountsModal;
  handlingFeeModal: IHandlingFeeModal;
  productsOptions: ISelectOption[];
  creditQuotas: IProduct[];
  usedQuotaModal: IUsedQuotaModalState;
  loadingCards: boolean;
  handleShowMovementsInfoModal: () => void;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleToggleSavingsAccountModal: () => void;
  handleToggleHandlingFeeModal: () => void;
  handleToggleUsedQuotaModal: () => void;
}

function CardUI(props: CardUIProps) {
  const {
    cardId,
    showMovementsInfoModal,
    selectedProduct,
    savingAccountsModal,
    handlingFeeModal,
    productsOptions,
    creditQuotas,
    usedQuotaModal,
    loadingCards,
    handleShowMovementsInfoModal,
    handleChangeProduct,
    handleToggleSavingsAccountModal,
    handleToggleHandlingFeeModal,
    handleToggleUsedQuotaModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 700px)");

  const attributes =
    selectedProduct && extractCardAttributes(selectedProduct.card);

  const formatedAttributes = attributes && formatCardCurrencyAttrs(attributes);

  const cardNumber = extractAttribute(attributes, "card_number")?.value || "";

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCard(cardId)} />
        <Title
          title="Consulta de tarjetas"
          subtitle="Información detallada de tus tarjetas"
          icon={<MdArrowBack />}
          navigatePage="/my-cards"
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s400}>
          <Stack direction="column" gap={inube.spacing.s300}>
            {selectedProduct && (
              <>
                <Select
                  id="cardProducts"
                  onChange={handleChangeProduct}
                  label="Selección de producto"
                  options={productsOptions}
                  value={selectedProduct.option}
                  isFullWidth
                  readOnly={productsOptions.length === 1}
                />
                <Box
                  title={selectedProduct.card.title}
                  subtitle={cardNumber.toString()}
                  tags={selectedProduct.card.tags}
                  loading={loadingCards}
                  {...cardBox}
                >
                  <Stack direction="column" gap={inube.spacing.s100}>
                    <Grid
                      templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                      gap={inube.spacing.s100}
                      autoRows="auto"
                    >
                      {formatedAttributes.slice(0, 3).map((attr) => (
                        <BoxAttribute
                          key={attr.id}
                          label={`${attr.label}: `}
                          value={attr.value}
                        />
                      ))}
                      {savingAccountsModal.data.length > 0 && (
                        <BoxAttribute
                          label={`Cuentas de ahorro: `}
                          buttonIcon={<MdOpenInNew />}
                          buttonValue="Ver"
                          onClickButton={handleToggleSavingsAccountModal}
                          withButton
                        />
                      )}

                      {handlingFeeModal.data.length > 0 && (
                        <BoxAttribute
                          label={`Cuota de manejo: `}
                          buttonIcon={<MdOpenInNew />}
                          buttonValue={currencyFormat(
                            Number(
                              handlingFeeModal.data.find(
                                (x) => x.id === "handling_fee_value",
                              )?.value,
                            ),
                          )}
                          onClickButton={handleToggleHandlingFeeModal}
                          withButton
                        />
                      )}
                    </Grid>
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
          <Stack direction="column" gap={inube.spacing.s300}>
            <Text type="title" size="medium">
              Cupos de crédito
            </Text>
            {loadingCards ? (
              <Box title="" subtitle="" loading={loadingCards} {...myQuotas} />
            ) : (
              creditQuotas.map((quota) => (
                <Box
                  key={quota.id}
                  title={quota.title}
                  subtitle={quota.id}
                  tags={quota.tags}
                  {...myQuotas}
                >
                  <Stack direction="column" gap={inube.spacing.s075}>
                    <Stack direction="column" gap={inube.spacing.s300}>
                      <Stack
                        direction="column"
                        gap={inube.spacing.s200}
                        alignItems="flex-end"
                      >
                        <Grid
                          templateColumns={`repeat(${!isDesktop ? 1 : 2}, 1fr)`}
                          gap={inube.spacing.s100}
                          autoRows="auto"
                          width="100%"
                        >
                          {formatCreditQuotasCurrencyAttrs(
                            extractCreditQuotasAttributes(quota),
                          )
                            .slice(0, 1)
                            .map((attribute) => (
                              <BoxAttribute
                                key={attribute.id}
                                label={attribute.label}
                                value={attribute.value}
                              />
                            ))}
                          {usedQuotaModal.data && (
                            <BoxAttribute
                              label="Cupo usado:"
                              buttonIcon={<MdOpenInNew />}
                              buttonValue={currencyFormat(
                                usedQuotaModal.data.usedQuotaValue,
                              )}
                              onClickButton={handleToggleUsedQuotaModal}
                              withButton
                            />
                          )}
                          {formatCreditQuotasCurrencyAttrs(
                            extractCreditQuotasAttributes(quota),
                          )
                            .slice(1)
                            .map((attribute) => (
                              <BoxAttribute
                                key={attribute.id}
                                label={attribute.label}
                                value={attribute.value}
                              />
                            ))}
                        </Grid>
                        <Button
                          iconBefore={<MdOutlineDescription />}
                          type="link"
                          path={`/my-cards/${selectedProduct.card.id}/credit-quota/${quota.id}`}
                          spacing="compact"
                        >
                          Detalles del cupo
                        </Button>
                      </Stack>
                      {quota.movements && quota.movements?.length > 0 && (
                        <Stack direction="column" gap={inube.spacing.s200}>
                          <Stack gap={inube.spacing.s100} alignItems="center">
                            <Text
                              type="title"
                              size={isMobile ? "small" : "medium"}
                            >
                              Últimos movimientos
                            </Text>
                            <Icon
                              icon={<MdQuestionMark />}
                              appearance="help"
                              spacing="narrow"
                              size="16px"
                              variant="filled"
                              shape="circle"
                              cursorHover
                              onClick={handleShowMovementsInfoModal}
                            />
                          </Stack>
                          <Stack direction="column" gap={inube.spacing.s200}>
                            {quota.movements
                              .slice(0, 5)
                              .map((movement, index) => (
                                <Stack
                                  direction="column"
                                  gap={inube.spacing.s200}
                                  key={movement.id}
                                >
                                  {index !== 0 && <Divider dashed />}
                                  <RecordCard
                                    id={movement.id}
                                    type={
                                      movement.type || EMovementType.PAYMENT
                                    }
                                    description={movement.description}
                                    value={movement.totalValue}
                                    attributes={generateAttributes(movement)}
                                  />
                                </Stack>
                              ))}
                          </Stack>
                          <Stack justifyContent="flex-end" width="100%">
                            <Button
                              iconBefore={<MdOutlineAssignmentTurnedIn />}
                              spacing="compact"
                              type="link"
                              path={`/my-cards/${selectedProduct.card.id}/movements/${quota.id}`}
                            >
                              Movimientos
                            </Button>
                          </Stack>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {showMovementsInfoModal.show && (
        <InfoModal
          {...infoModalData}
          onCloseModal={handleShowMovementsInfoModal}
        />
      )}
      {savingAccountsModal.show && (
        <SavingAccountsModal
          portalId="modals"
          savingAccounts={savingAccountsModal.data}
          onCloseModal={handleToggleSavingsAccountModal}
        />
      )}
      {handlingFeeModal.show && (
        <HandlingFeeModal
          portalId="modals"
          handlingFee={handlingFeeModal.data}
          onCloseModal={handleToggleHandlingFeeModal}
        />
      )}
      {usedQuotaModal.show && usedQuotaModal.data && (
        <UsedQuotaModal
          portalId="modals"
          onCloseModal={handleToggleUsedQuotaModal}
          usedQuotaData={usedQuotaModal.data}
        />
      )}
    </>
  );
}

export { CardUI };
