import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { CreditMovementModal } from "@components/modals/credit/CreditMovementModal";
import { ExpiredPaymentModal } from "@components/modals/general/ExpiredPaymentModal";
import { NextPaymentModal } from "@components/modals/general/NextPaymentModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignment,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { EMovementType, IMovement } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { generateAttributes } from "./config/attributeRecord";
import { creditBox } from "./config/credit";
import { crumbsCredit } from "./config/navigation";
import {
  extractCreditAttributes,
  formatCreditCurrencyAttrs,
} from "./config/product";
import { StyledMovementsContainer } from "./styles";
import {
  IExpiredPaymentModalState,
  INextPaymentModalState,
  ISelectedProductState,
} from "./types";

const renderMovements = (
  movements: IMovement[],
  loading: boolean,
  handleOpenModal: (movement: IMovement) => void,
) =>
  movements &&
  movements.slice(0, 5).map((movement, index) => (
    <Stack direction="column" gap={inube.spacing.s200} key={movement.id}>
      {index !== 0 && <Divider dashed />}
      <RecordCard
        id={movement.id}
        type={movement.type || EMovementType.CREDIT}
        description={movement.description}
        value={movement.totalValue || 0}
        loading={loading}
        attributes={generateAttributes(movement)}
        onClick={() => handleOpenModal(movement)}
        withExpandingIcon
      />
    </Stack>
  ));

interface CreditUIProps {
  isMobile: boolean;
  selectedProduct?: ISelectedProductState;
  loading: boolean;
  productsOptions: ISelectOption[];
  credit_id?: string;
  nextPaymentModal: INextPaymentModalState;
  expiredPaymentModal: IExpiredPaymentModalState;
  creditMovementModal: boolean;
  selectedMovement?: IMovement;
  handleToggleNextPaymentModal: () => void;
  handleToggleExpiredPaymentModal: () => void;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOpenModal: (movement: IMovement) => void;
  handleCloseModal: () => void;
}

function CreditUI(props: CreditUIProps) {
  const {
    isMobile,
    selectedProduct,
    loading,
    productsOptions,
    credit_id,
    nextPaymentModal,
    expiredPaymentModal,
    creditMovementModal,
    selectedMovement,
    handleToggleNextPaymentModal,
    handleToggleExpiredPaymentModal,
    handleChangeProduct,
    handleOpenModal,
    handleCloseModal,
  } = props;

  const attributes =
    selectedProduct && extractCreditAttributes(selectedProduct.credit);

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  const formatedAttributes =
    attributes && formatCreditCurrencyAttrs(attributes);

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCredit(credit_id)} />
        <Title
          title="Consulta de créditos"
          subtitle="Información detallada de tus productos de crédito"
          icon={<MdArrowBack />}
          navigatePage="/my-credits"
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
          {selectedProduct && formatedAttributes && (
            <>
              <Select
                id="creditProducts"
                onChange={handleChangeProduct}
                label="Selección de producto"
                options={productsOptions}
                value={selectedProduct.option}
                isFullWidth
                readOnly={productsOptions.length === 1}
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

                    <BoxAttribute
                      label="Total próximo pago:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue={currencyFormat(
                        nextPaymentModal.data?.nextPaymentValue || 0,
                      )}
                      buttonDisabled={
                        nextPaymentModal.data?.nextPaymentValue === 0 ||
                        !nextPaymentModal.data
                      }
                      onClickButton={handleToggleNextPaymentModal}
                      withButton
                    />

                    {formatedAttributes.slice(3, 8).map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}

                    <BoxAttribute
                      label="Valor vencido:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue={currencyFormat(
                        expiredPaymentModal.data?.expiredValue || 0,
                      )}
                      buttonDisabled={
                        expiredPaymentModal.data?.expiredValue === 0 ||
                        !expiredPaymentModal.data
                      }
                      onClickButton={handleToggleExpiredPaymentModal}
                      withButton
                    />

                    {formatedAttributes.slice(8).map((attr) => (
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
            <Stack direction="column" gap={inube.spacing.s300}>
              <Text type="title" size="medium">
                Últimos movimientos
              </Text>
              <StyledMovementsContainer $isMobile={isMobile}>
                <Stack direction="column" gap={inube.spacing.s200} width="100%">
                  {selectedProduct.credit.movements &&
                  selectedProduct.credit.movements.length > 0 ? (
                    renderMovements(
                      selectedProduct.credit.movements,
                      loading,
                      handleOpenModal,
                    )
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
              <Stack justifyContent="flex-end">
                <Button
                  type="link"
                  spacing="compact"
                  iconBefore={<MdOutlineAssignmentTurnedIn />}
                  path={`/my-credits/${credit_id}/credit-movements`}
                >
                  Movimientos
                </Button>
              </Stack>
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
      {expiredPaymentModal.show && expiredPaymentModal.data && (
        <ExpiredPaymentModal
          portalId="modals"
          onCloseModal={handleToggleExpiredPaymentModal}
          expiredPaymentData={expiredPaymentModal.data}
        />
      )}
      {creditMovementModal && selectedMovement && (
        <CreditMovementModal
          portalId="modals"
          onCloseModal={handleCloseModal}
          movement={selectedMovement}
        />
      )}
    </>
  );
}

export { CreditUI };
