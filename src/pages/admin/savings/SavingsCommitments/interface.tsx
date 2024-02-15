import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { Text } from "@design/data/Text";
import { Table } from "@design/data/Table";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { MdArrowBack, MdSyncAlt, MdOpenInNew } from "react-icons/md";
import {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
} from "../MySavings/config/products";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { crumbsSavingsCommitments } from "./config/navigation";
import { ISelectedCommitmentState } from "./types";
import { currencyFormat } from "src/utils/currency";
import { NextPaymentModal } from "@components/modals/NextPaymentModal";
import { INextPaymentModalState } from "./types";
import { StyledPaymentsContainer } from "./styles";
import {
  savingsAccountPaymentsTableTitles,
  savingAccountPaymentsNormalizeEntries,
  savingsAccountPaymentsTableActions,
  savingsAccountPaymentsTableBreakpoints,
} from "./config/table";

function renderProducts(
  selectedCommitment: ISelectedCommitmentState["commitment"]["products"],
) {
  return selectedCommitment.map((commitment) => {
    const products = [...savingsMock, ...investmentsMock];
    const product = products.find((savings) => savings.id === commitment);
    if (product) {
      const productsIcons = { ...savingsAccountIcons, ...investmentIcons };
      return (
        <Product
          key={product.id}
          title={product.title}
          description={product.id}
          attributes={formatMySavingsCurrencyAttrs(
            extractMySavingsAttributes(product),
          )}
          breakpoints={mySavingsAttributeBreakpoints}
          tags={product.tags}
          icon={productsIcons[product.type]}
          navigateTo={`/my-savings/account/${product.id}`}
        />
      );
    }
  });
}

interface SavingsCommitmentsUIProps {
  commitmentId?: string;
  commitmentsOptions: ISelectOption[];
  nextPaymentModal: INextPaymentModalState;
  selectedCommitment: ISelectedCommitmentState;
  isMobile: boolean;
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
        gap="s300"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
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
              subtitle="Compromiso de ahorro"
              collapsing={{ start: true, allow: false }}
              tags={
                selectedCommitment.commitment.tag && [
                  selectedCommitment.commitment.tag,
                ]
              }
            >
              <Stack direction="column" gap="s100">
                <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
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
                  {selectedCommitment.commitment.attributes
                    .filter((attr) => attr.id !== "value_to_pay")
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
                {renderProducts(selectedCommitment.commitment.products)}
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
        <Stack direction="column" gap="s200" alignItems="flex-start">
          <Text type="label" size="large">
            Pagos recientes
          </Text>
          <StyledPaymentsContainer>
            <Table
              portalId="modals"
              titles={savingsAccountPaymentsTableTitles}
              breakpoints={savingsAccountPaymentsTableBreakpoints}
              actions={savingsAccountPaymentsTableActions}
              entries={savingAccountPaymentsNormalizeEntries(
                selectedCommitment.commitment.movements || [],
              ).slice(0, 5)}
              pageLength={selectedCommitment.commitment.movements?.length || 0}
              hideMobileResume
            />
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
