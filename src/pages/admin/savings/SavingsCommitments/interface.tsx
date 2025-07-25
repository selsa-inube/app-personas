import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { NextPaymentModal } from "@components/modals/general/NextPaymentModal";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, IOption, Select } from "@inubekit/inubekit";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignmentTurnedIn,
  MdSyncAlt,
} from "react-icons/md";
import { EMovementType, IMovement, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

import { RecordCard } from "@components/cards/RecordCard";
import { useQuickLinks } from "@hooks/useQuickLinks";
import { Breadcrumbs, Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import {
  extractSavingsAttributes,
  formatSavingsCurrencyAttrs,
  savingAttributeBreakpoints,
} from "@pages/admin/home/config/products";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { generateAttributes } from "./config/attributeRecord";
import { extractSavingsCommitmentsAttributes } from "./config/commitments";
import { crumbsSavingsCommitments } from "./config/navigation";
import { StyledPaymentsContainer } from "./styles";
import { INextPaymentModalState, ISelectedCommitmentState } from "./types";

function renderProducts(
  selectedCommitment: ISelectedCommitmentState["commitment"]["products"],
  savingProducts: IProduct[],
) {
  return selectedCommitment.map((commitment) => {
    const product = savingProducts.find((savings) => savings.id === commitment);
    if (product) {
      const productsIcons = { ...savingsAccountIcons, ...investmentIcons };
      return (
        <Product
          key={product.id}
          title={product.title}
          description={product.id}
          attributes={formatSavingsCurrencyAttrs(
            extractSavingsAttributes(product),
          )}
          breakpoints={savingAttributeBreakpoints}
          tags={product.tags}
          icon={productsIcons[product.type]}
          navigateTo={`/my-savings/account/${product.id}`}
        />
      );
    }
  });
}

const renderMovements = (movements: IMovement[]) =>
  movements &&
  movements.slice(0, 5).map((movement, index) => (
    <Stack
      direction="column"
      gap={inube.spacing.s200}
      key={movement.id}
      width="100%"
    >
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

interface SavingsCommitmentsUIProps {
  commitmentId?: string;
  commitmentsOptions: IOption[];
  nextPaymentModal: INextPaymentModalState;
  selectedCommitment: ISelectedCommitmentState;
  isMobile: boolean;
  savingProducts: IProduct[];
  goToMovements: () => void;
  handleChangeCommitment: (name: string, value: string) => void;
  handleToggleNextPaymentModal: () => void;
}

function SavingsCommitmentsUI(props: SavingsCommitmentsUIProps) {
  const {
    commitmentId,
    commitmentsOptions,
    nextPaymentModal,
    selectedCommitment,
    isMobile,
    savingProducts,
    goToMovements,
    handleChangeCommitment,
    handleToggleNextPaymentModal,
  } = props;
  const quickLinksArray = useQuickLinks();

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsSavingsCommitments(commitmentId)} />
        <Title
          title="Consulta de compromisos"
          subtitle="Información detallada de compromisos de ahorro"
          icon={<MdArrowBack />}
          navigatePage={`/my-savings`}
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        >
          <Select
            id="savingCommitments"
            name="savingCommitments"
            onChange={handleChangeCommitment}
            label="Selección del compromiso"
            options={commitmentsOptions}
            value={selectedCommitment.option}
            fullwidth
          />
          <Stack
            direction="column"
            gap={isMobile ? inube.spacing.s250 : inube.spacing.s400}
          >
            <Box
              title={selectedCommitment.commitment.title}
              subtitle={selectedCommitment.commitment.id}
              collapsing={{ start: true, allow: false }}
              tags={
                selectedCommitment.commitment.tag && [
                  selectedCommitment.commitment.tag,
                ]
              }
            >
              <Stack direction="column" gap={inube.spacing.s100}>
                <Grid
                  templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                  gap={inube.spacing.s100}
                  autoRows="auto"
                >
                  {nextPaymentModal.data && (
                    <BoxAttribute
                      label="Valor próximo pago:"
                      buttonIcon={<MdOpenInNew />}
                      buttonValue={currencyFormat(
                        nextPaymentModal.data.nextPaymentValue,
                      )}
                      onClickButton={handleToggleNextPaymentModal}
                      withButton
                    />
                  )}
                  {extractSavingsCommitmentsAttributes(
                    selectedCommitment.commitment,
                  )
                    .filter((attr) => attr.id !== "next_payment_value")
                    .map((attr) => (
                      <BoxAttribute
                        key={attr.id}
                        label={`${attr.label}: `}
                        value={attr.value}
                      />
                    ))}
                </Grid>
              </Stack>
            </Box>
            <Box
              icon={<MdSyncAlt />}
              title="Destinaciones"
              subtitle="Productos que reciben dinero de este compromiso de ahorro"
              collapsing={{ start: true, allow: false }}
            >
              <Stack direction="column" gap={inube.spacing.s100}>
                {renderProducts(
                  selectedCommitment.commitment.products,
                  savingProducts,
                )}
              </Stack>
            </Box>
          </Stack>

          <Stack
            direction="column"
            gap={inube.spacing.s200}
            alignItems="flex-start"
          >
            <Text type="label" size="large">
              Movimientos recientes
            </Text>

            <StyledPaymentsContainer $isMobile={isMobile}>
              {selectedCommitment.commitment.movements &&
              selectedCommitment.commitment.movements.length > 0 ? (
                renderMovements(selectedCommitment.commitment.movements)
              ) : (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={inube.spacing.s100}
                  width="100%"
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
            </StyledPaymentsContainer>

            <Stack direction="row" justifyContent="flex-end" width="100%">
              <Button
                iconBefore={<MdOutlineAssignmentTurnedIn />}
                spacing="compact"
                appearance="primary"
                variant="filled"
                onClick={goToMovements}
              >
                Movimientos
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
      {nextPaymentModal.show && nextPaymentModal.data && (
        <NextPaymentModal
          portalId="modals"
          type="commitment"
          onCloseModal={handleToggleNextPaymentModal}
          nextPaymentData={nextPaymentModal.data}
        />
      )}
    </>
  );
}

export { SavingsCommitmentsUI };
