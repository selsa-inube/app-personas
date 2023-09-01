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
import { IBeneficiariesModal } from ".";
import { AttributesModal } from "@components/modals/AttributesModal";

interface InvestmentUIProps {
  isMobile?: boolean;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  beneficiariesModal: IBeneficiariesModal;
  productId?: string;
  handleChangeProduct: (option: ISelectOption) => void;
  handleToggleModal: () => void;
}

function InvestmentUI(props: InvestmentUIProps) {
  const {
    isMobile,
    selectedProduct,
    productsOptions,
    productId,
    beneficiariesModal,
    handleToggleModal,
    handleChangeProduct,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  const attributes = extractInvestmentAttributes(selectedProduct.investment);

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
                  buttonValue={beneficiariesModal.data.length}
                  onClickButton={handleToggleModal}
                  withButton
                />
              </Grid>
            </Stack>
          </Box>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
      {beneficiariesModal.show && (
        <AttributesModal
          portalId="modals"
          title="Beneficiarios"
          description="Porcentaje de participación"
          onCloseModal={handleToggleModal}
          attributes={beneficiariesModal.data}
        ></AttributesModal>
      )}
    </>
  );
}

export { InvestmentUI };
