import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import creditsMock from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import { MdArrowBack, MdOpenInNew, MdOutlineAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AmountValue } from "../MyCredits/AmountValue";
import {
  amortizationTableBreakpoints,
  amortizationTableTitles,
} from "../MyCredits/config/tables";
import { StyledIconView, StyledAmortizationContainer } from "./styles";
import { ISelectedProductState } from "./types";
import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Cuota",
    content: (amortization) => (
      <AmountValue value={amortization.totalMonthlyValue} />
    ),
    mobilePriority: true,
  },
  {
    id: "2",
    actionName: "Ver",
    content: () => (
      <StyledIconView>
        <MdOpenInNew />
      </StyledIconView>
    ),
    mobilePriority: true,
  },
];

function CreditAmortization() {
  const { credit_id } = useParams();
  const navigate = useNavigate();
  const mquery = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  const [selectedProduct, setSelectedProduct] = useState<
    ISelectedProductState | undefined
  >(undefined);
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
        value: `${credit.title} - ${credit.id}`,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          totalAmortization: credit.amortization?.length || 0,
          amortization: credit.amortization || [],
          option: productOption,
          interestRateAttr: credit.attributes.find(
            (attr) => attr.id === "interest_rate"
          ) || { id: "", label: "", value: "" },
          termsAttr: credit.attributes.find((attr) => attr.id === "terms") || {
            id: "",
            label: "",
            value: "",
          },
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-credits/${option.id}/credit-amortization`);
  };

  if (!selectedProduct) return null;

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
            value={selectedProduct?.option}
            isFullWidth
          />
          <Box
            title={selectedProduct.option.title}
            subtitle={selectedProduct.option.id}
            icon={<MdOutlineAttachMoney size={34} />}
            collapsing={{ start: false, allow: false }}
          >
            <Stack direction={isMobile ? "column" : "row"} gap="s100">
              <BoxAttribute
                label={selectedProduct.interestRateAttr.label}
                value={selectedProduct.interestRateAttr.value}
              />
              <BoxAttribute
                label={selectedProduct.termsAttr.label}
                value={selectedProduct.termsAttr.value}
              />
            </Stack>
          </Box>
          <StyledAmortizationContainer>
            <Table
              id="modals"
              titles={amortizationTableTitles}
              breakpoints={amortizationTableBreakpoints}
              actions={creditTableActions}
              entries={selectedProduct.amortization}
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
