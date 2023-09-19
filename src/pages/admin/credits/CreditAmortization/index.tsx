import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { creditsMock } from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import {
  amortizationTableBreakpoints,
  amortizationTableTitles,
} from "../MyCredits/config/tables";
import { extractCreditAmortizationAttrs } from "./config/product";
import {
  creditAmortizationTableActions,
  formatCurrencyEntries,
} from "./config/table";
import { StyledAmortizationContainer } from "./styles";
import { ISelectedProductState } from "./types";

function CreditAmortization() {
  const { credit_id } = useParams();
  const navigate = useNavigate();
  const mquery = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);

  const crumbsAmortization = [
    {
      id: "home",
      path: "/",
      label: "Home",
    },
    {
      id: "myCredits",
      path: "/my-credits",
      label: "Mis créditos",
    },
    {
      id: "credit",
      path: `/my-credits/${credit_id}`,
      label: "Consulta de créditos",
    },
    {
      id: "creditAmortization",
      path: `/my-credits/${credit_id}/credit-amortization`,
      label: "Plan de pagos",
      isActive: true,
    },
  ];

  useEffect(() => {
    handleSortProduct();
  }, [credit_id]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        title: credit.title,
        value: credit.description,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          credit,
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (id: string) => {
    navigate(`/my-credits/${id}/credit-amortization`);
  };

  if (!selectedProduct || !selectedProduct.credit.amortization) return null;

  const attributes = extractCreditAmortizationAttrs(selectedProduct.credit);

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsAmortization} />
        <Title
          title="Plan de pagos"
          subtitle="Detalle de la amortización del crédito"
          icon={<MdArrowBack />}
          navigatePage={`/my-credits/${credit_id}`}
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
            id="creditProducts"
            handleChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct.option.id}
            isFullWidth
          />
          <Box
            title={selectedProduct.option.title}
            subtitle={selectedProduct.option.id}
            icon={<MdOutlineAttachMoney size={34} />}
            collapsing={{ start: false, allow: false }}
          >
            <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
              {attributes.map((attr) => (
                <BoxAttribute
                  key={attr.id}
                  label={`${attr.label}: `}
                  value={attr.value}
                />
              ))}
            </Grid>
          </Box>
          <StyledAmortizationContainer>
            <Table
              id="modals"
              titles={amortizationTableTitles}
              breakpoints={amortizationTableBreakpoints}
              actions={creditAmortizationTableActions}
              entries={formatCurrencyEntries(
                selectedProduct.credit.amortization
              )}
              hideMobileResume
            />
          </StyledAmortizationContainer>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditAmortization };
