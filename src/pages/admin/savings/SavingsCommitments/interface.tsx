import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Product } from "@components/cards/Product";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { investmentsMock } from "@mocks/products/investments/investments.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { MdArrowBack, MdSyncAlt } from "react-icons/md";
import { truncateAndObfuscateDescription } from "src/utils/formats";
import {
  extractMySavingsAttributes,
  formatMySavingsCurrencyAttrs,
  mySavingsAttributeBreakpoints,
} from "../MySavings/config/products";
import {
  investmentIcons,
  savingsAccountIcons,
} from "../SavingsAccount/config/saving";
import { formatSavingCommitmentsCurrencyAttrs } from "./config/commitments";
import { crumbsSavingsCommitments } from "./config/navigation";
import { ISelectedCommitmentState } from "./types";

interface SavingsCommitmentsUIProps {
  commitmentId?: string;
  commitmentsOptions: ISelectOption[];
  handleChangeCommitment: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCommitment: ISelectedCommitmentState;
  isMobile: boolean;
}

function renderProducts(
  selectedCommitment: ISelectedCommitmentState["commitment"]["products"]
) {
  return selectedCommitment.map((commitment) => {
    const products = [...savingsMock, ...investmentsMock];
    const product = products.find((savings) => savings.id === commitment);
    if (product) {
      const productsIcons = { ...savingsAccountIcons, ...investmentIcons };
      return (
        <Product
          id={product.id}
          key={product.id}
          title={product.title}
          description={truncateAndObfuscateDescription(
            product.id,
            product.type,
            4
          )}
          attributes={formatMySavingsCurrencyAttrs(
            extractMySavingsAttributes(product)
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

function SavingsCommitmentsUI(props: SavingsCommitmentsUIProps) {
  const {
    commitmentId,
    commitmentsOptions,
    handleChangeCommitment,
    selectedCommitment,
    isMobile,
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
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap={isMobile ? "s200" : "s300"}>
          <Select
            id="savingCommitments"
            handleChange={handleChangeCommitment}
            label="Selección del compromiso"
            options={commitmentsOptions}
            value={selectedCommitment.option.id}
            isFullWidth
          />
          <Stack direction="column" gap={isMobile ? "s250" : "s400"}>
            <Box
              title={selectedCommitment.commitment.title}
              subtitle={selectedCommitment.commitment.description}
              collapsing={{ start: true, allow: false }}
              tags={
                selectedCommitment.commitment.tag && [
                  selectedCommitment.commitment.tag,
                ]
              }
            >
              <Stack direction="column" gap="s100">
                <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                  {formatSavingCommitmentsCurrencyAttrs(
                    selectedCommitment.commitment.attributes
                  ).map((attr) => (
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
      </Grid>
    </>
  );
}

export { SavingsCommitmentsUI };
