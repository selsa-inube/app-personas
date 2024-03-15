import { Button } from "@design/input/Button";
import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import {
  MdArrowBack,
  MdOpenInNew,
  MdQuestionMark,
  MdOutlineDescription,
  MdOutlineCheck,
  MdOutlineCached,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { crumbsCard } from "./config/navigation";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { inube } from "@design/tokens";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import {
  IHandlingFeeModal,
  ISavingAccountsModal,
  ISelectedProductState,
} from "./types";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Box } from "@components/cards/Box";
import { cardBox } from "./config/card";
import {
  extractCardAttributes,
  formatCardCurrencyAttrs,
} from "./config/product";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { SavingAccountsModal } from "@components/modals/cards/SavingAccountsModal";
import { HandlingFeeModal } from "@components/modals/cards/HandlingFeeModal";
import { currencyFormat } from "src/utils/currency";
import { myQuotas } from "./config/card";
import { infoModalData } from "./config/modals";
import { formatCreditQuotasCurrencyAttrs } from "./config/product";
import { InfoModal } from "@components/modals/InfoModal";
import { IMovementsInfoModal } from "./types";
import { EQuotasMovementType, IProduct } from "src/model/entity/product";
import { getMovementDescriptionType } from "./config/product";
import { Divider } from "@design/layout/Divider";
import { formatPrimaryDateWithTime } from "src/utils/dates";

interface CardUIProps {
  cardId?: string;
  showMovementsInfoModal: IMovementsInfoModal;
  selectedProduct: ISelectedProductState;
  savingAccountsModal: ISavingAccountsModal;
  handlingFeeModal: IHandlingFeeModal;
  productsOptions: ISelectOption[];
  creditQuotas: IProduct[];
  handleShowMovementsInfoModal: () => void;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleToggleSavingsAccountModal: () => void;
  handleToggleHandlingFeeModal: () => void;
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
    handleShowMovementsInfoModal,
    handleChangeProduct,
    handleToggleSavingsAccountModal,
    handleToggleHandlingFeeModal,
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
                      <BoxAttribute
                        label={`Cuentas de ahorro: `}
                        buttonIcon={<MdOpenInNew />}
                        buttonValue="Ver"
                        onClickButton={handleToggleSavingsAccountModal}
                        withButton
                      />
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
                        {formatCreditQuotasCurrencyAttrs(quota.attributes).map(
                          (attribute) => (
                            <BoxAttribute
                              key={attribute.id}
                              label={attribute.label}
                              value={attribute.value}
                            />
                          ),
                        )}
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
                          <Text type="title" size="medium">
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
                                  <Stack justifyContent="space-between">
                                    <Stack gap="s100">
                                      {movement.quotasMovementsType ===
                                        EQuotasMovementType.BUY && (
                                        <Icon
                                          icon={<MdArrowBack />}
                                          appearance="error"
                                          spacing="none"
                                          size="16px"
                                          variant="outlined"
                                          shape="circle"
                                        />
                                      )}
                                      {movement.quotasMovementsType ===
                                        EQuotasMovementType.REVERSE && (
                                        <Icon
                                          icon={<MdOutlineCached />}
                                          appearance="success"
                                          spacing="none"
                                          size="16px"
                                          variant="outlined"
                                          shape="circle"
                                        />
                                      )}
                                      {movement.quotasMovementsType ===
                                        EQuotasMovementType.PAY && (
                                        <Icon
                                          icon={<MdOutlineCheck />}
                                          appearance="success"
                                          spacing="none"
                                          size="16px"
                                          variant="outlined"
                                          shape="circle"
                                        />
                                      )}
                                      <Text
                                        type="label"
                                        size="medium"
                                      >{`${getMovementDescriptionType(movement.quotasMovementsType)} ${movement.description}`}</Text>
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
                                      {formatPrimaryDateWithTime(movement.date)}
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
    </>
  );
}

export { CardUI };
