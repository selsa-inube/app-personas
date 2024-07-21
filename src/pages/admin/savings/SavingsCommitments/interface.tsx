import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { NextPaymentModal } from "@components/modals/general/NextPaymentModal";
import { quickLinks } from "@config/quickLinks";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdArrowBack, MdOpenInNew, MdSyncAlt } from "react-icons/md";
import { EMovementType, IMovement, IProduct } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";

import {
  extractSavingsAttributes,
  formatSavingsCurrencyAttrs,
  savingAttributeBreakpoints,
} from "@pages/admin/home/config/products";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { extractSavingsCommitmentsAttributes } from "./config/commitments";
import { crumbsSavingsCommitments } from "./config/navigation";
import { StyledPaymentsContainer } from "./styles";
import { INextPaymentModalState, ISelectedCommitmentState } from "./types";
import { RecordCard } from "@components/cards/RecordCard";
import { generateAttributes } from "./config/attributeRecord";
import { Divider } from "@inubekit/divider";
import { Grid } from "@inubekit/grid";

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
    <Stack direction="column" gap="s200" key={movement.id} width="100%">
      {index !== 0 && <Divider dashed />}
      <RecordCard
        id={movement.id}
        type={movement.type || EMovementType.CREDIT}
        description={movement.description}
        totalValue={movement.totalValue || 0}
        attributes={generateAttributes(movement)}
      />
    </Stack>
  ));

interface SavingsCommitmentsUIProps {
  commitmentId?: string;
  commitmentsOptions: ISelectOption[];
  nextPaymentModal: INextPaymentModalState;
  selectedCommitment: ISelectedCommitmentState;
  isMobile: boolean;
  savingProducts: IProduct[];
  handleChangeCommitment: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
    handleChangeCommitment,
    handleToggleNextPaymentModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
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
        <Stack direction="column" gap={isMobile ? "s200" : "s300"}>
          <Select
            id="savingCommitments"
            onChange={handleChangeCommitment}
            label="Selección del compromiso"
            options={commitmentsOptions}
            value={selectedCommitment.option}
            isFullWidth
          />
          <Stack direction="column" gap={isMobile ? "s250" : "s400"}>
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
              <Stack direction="column" gap="s100">
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
              <Stack direction="column" gap="s100">
                {renderProducts(
                  selectedCommitment.commitment.products,
                  savingProducts,
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
        <Stack direction="column" gap="s200" alignItems="flex-start">
          <Text type="label" size="large">
            Pagos recientes
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
                gap="s100"
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
        </Stack>
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

export { SavingsCommitmentsUI };
