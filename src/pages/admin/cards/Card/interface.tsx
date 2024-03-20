import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { InfoModal } from "@components/modals/InfoModal";
import { HandlingFeeModal } from "@components/modals/cards/HandlingFeeModal";
import { SavingAccountsModal } from "@components/modals/cards/SavingAccountsModal";
import { quickLinks } from "@config/quickLinks";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignmentTurnedIn,
  MdOutlineCached,
  MdOutlineCheck,
  MdOutlineDescription,
  MdQuestionMark,
} from "react-icons/md";
import { EMovementType, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { cardBox, myQuotas } from "./config/card";
import { infoModalData } from "./config/modals";
import { crumbsCard } from "./config/navigation";
import {
  extractCardAttributes,
  extractCreditQuotasAttributes,
  formatCardCurrencyAttrs,
  formatCreditQuotasCurrencyAttrs,
  getMovementDescriptionType,
} from "./config/product";
import {
  IHandlingFeeModal,
  IMovementsInfoModal,
  ISavingAccountsModal,
  ISelectedProductState,
} from "./types";
import { IUsedQuotaModalState } from "../CreditQuota/types";
import { UsedQuotaModal } from "@components/modals/cards/UsedQuotaModal";

interface CardUIProps {
  cardId?: string;
  showMovementsInfoModal: IMovementsInfoModal;
  selectedProduct: ISelectedProductState;
  savingAccountsModal: ISavingAccountsModal;
  handlingFeeModal: IHandlingFeeModal;
  productsOptions: ISelectOption[];
  creditQuotas: IProduct[];
  usedQuotaModal: IUsedQuotaModalState;
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

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCard(cardId)} />
        <Title
          title="Consulta de tarjetas"
          subtitle="Información detallada de tus tarjetas"
          icon={<MdArrowBack />}
          navigatePage="/my-cards"
        />
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s400">
          <Stack direction="column" gap="s300">
            {selectedProduct && (
              <>
                <Select
                  id="cardProducts"
                  onChange={handleChangeProduct}
                  label="Selección de producto"
                  options={productsOptions}
                  value={selectedProduct.option}
                  isFullWidth
                />
                <Box
                  title={selectedProduct.card.title}
                  subtitle={selectedProduct.card.id}
                  tags={selectedProduct.card.tags}
                  {...cardBox}
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
          <Stack direction="column" gap="s300">
            <Text type="title" size="medium">
              Cupos de crédito
            </Text>

            {creditQuotas.map((quota) => (
              <Box
                key={quota.id}
                title={quota.title}
                subtitle={quota.id}
                tags={quota.tags}
                {...myQuotas}
              >
                <Stack direction="column" gap="s075">
                  <Stack direction="column" gap="s300">
                    <Stack direction="column" gap="s200" alignItems="flex-end">
                      <Grid
                        templateColumns={!isDesktop ? "1fr" : "1fr 1fr"}
                        gap="s100"
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
                      <Stack direction="column" gap="s200">
                        <Stack gap="s100" alignItems="center">
                          <Text
                            type="title"
                            size={isMobile ? "small" : "medium"}
                          >
                            Últimos movimientos
                          </Text>
                          <Icon
                            icon={<MdQuestionMark />}
                            appearance="help"
                            spacing="none"
                            size="16px"
                            variant="filled"
                            shape="circle"
                            cursorHover
                            onClick={handleShowMovementsInfoModal}
                          />
                        </Stack>
                        <Stack direction="column" gap="s200">
                          {quota.movements
                            .slice(0, 5)
                            .map((movement, index) => (
                              <Stack
                                direction="column"
                                gap="s200"
                                key={movement.id}
                              >
                                {index !== 0 && <Divider dashed />}
                                <Stack direction="column" gap="s100">
                                  <Stack
                                    justifyContent="space-between"
                                    gap="s100"
                                  >
                                    <Stack gap="s100">
                                      <Stack direction="column">
                                        {movement.type ===
                                          EMovementType.PURCHASE && (
                                          <Icon
                                            icon={<MdArrowBack />}
                                            appearance="error"
                                            spacing="none"
                                            size="16px"
                                            variant="outlined"
                                            shape="circle"
                                          />
                                        )}
                                        {movement.type ===
                                          EMovementType.REVERSE && (
                                          <Icon
                                            icon={<MdOutlineCached />}
                                            appearance="success"
                                            spacing="none"
                                            size="16px"
                                            variant="outlined"
                                            shape="circle"
                                          />
                                        )}
                                        {movement.type ===
                                          EMovementType.PAYMENT && (
                                          <Icon
                                            icon={<MdOutlineCheck />}
                                            appearance="success"
                                            spacing="none"
                                            size="16px"
                                            variant="outlined"
                                            shape="circle"
                                          />
                                        )}
                                      </Stack>
                                      <Text
                                        type="label"
                                        size="medium"
                                      >{`${getMovementDescriptionType(movement.type)} ${movement.description}`}</Text>
                                    </Stack>
                                    <Text type="label" size="medium">
                                      {currencyFormat(movement.totalValue)}
                                    </Text>
                                  </Stack>
                                  <Stack justifyContent="space-between">
                                    <Text
                                      type="label"
                                      size="medium"
                                      appearance="gray"
                                    >
                                      {formatPrimaryDate(movement.date, true)}
                                    </Text>
                                    <Text
                                      type="label"
                                      size="medium"
                                      appearance="gray"
                                    >
                                      {movement.quotas}
                                    </Text>
                                  </Stack>
                                </Stack>
                              </Stack>
                            ))}
                        </Stack>
                        <Stack justifyContent="flex-end" width="100%">
                          <Button
                            iconBefore={<MdOutlineAssignmentTurnedIn />}
                            spacing="compact"
                          >
                            Movimientos
                          </Button>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Box>
            ))}
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
