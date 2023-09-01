import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
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
import { MdArrowBack, MdOpenInNew } from "react-icons/md";
import { investmentBox } from "./config/investment";
import { crumbsInvestment } from "./config/navigation";
import {
  extractInvestmentAttributes,
  formatInvestmentCurrencyAttrs,
} from "./config/product";
import { ISelectedProductState } from "./types";

interface InvestmentUIProps {
  isMobile?: boolean;
  handleChangeProduct: (option: ISelectOption) => void;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  productId?: string;
}

function InvestmentUI(props: InvestmentUIProps) {
  const {
    isMobile,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    productId,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  const attributes = extractInvestmentAttributes(selectedProduct.investment);

  const beneficiariesAttribute = selectedProduct.investment.attributes.find(
    (attr) => attr.id === "beneficiaries"
  );

  const beneficiariesLength = Array.isArray(beneficiariesAttribute?.value)
    ? beneficiariesAttribute?.value.length
    : 0;

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsInvestment(productId)} />
        <Title
          title="Consulta de inversiones"
          subtitle="Información detallada de tus productos de inversión"
          icon={<MdArrowBack />}
          navigatePage="/my-investments"
        />
      </Stack>

      <Grid
        gap="s600"
        margin={
          mquery ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={mquery ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s300">
          <Select
            id="investmentProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct?.option}
            inputSize={isMobile ? "compact" : "wide"}
            isFullWidth
          />
          <Box
            title={selectedProduct.investment.title}
            subtitle={
              isMobile
                ? selectedProduct.investment.id
                : `${selectedProduct.investment.title} - ${selectedProduct.investment.id}`
            }
            tags={selectedProduct.investment.tags}
            {...investmentBox}
          >
            <Stack direction="column" gap="s100">
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                <BoxAttribute
                  key="titleAttr"
                  label="Titulo:"
                  value={selectedProduct.investment.id}
                />
                {formatInvestmentCurrencyAttrs(attributes).map((attr) => (
                  <BoxAttribute
                    key={attr.id}
                    label={`${attr.label}: `}
                    value={attr.value}
                  />
                ))}
                <BoxAttribute
                  key="beneficiariesAttr"
                  label="Beneficiarios:"
                  buttonIcon={<MdOpenInNew />}
                  buttonValue={beneficiariesLength}
                  withButton
                />
              </Grid>
            </Stack>
          </Box>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { InvestmentUI };
