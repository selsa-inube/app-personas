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
import { useAuth } from "@inube/auth";
import { useContext, useEffect, useState } from "react";
import { MdArrowBack, MdOutlineAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CreditsContext } from "src/context/credits";
import {
  amortizationTableBreakpoints,
  amortizationTableTitles,
} from "../MyCredits/config/tables";
import { extractCreditAmortizationAttrs } from "./config/product";
import {
  amortizationNormalizeEntries,
  creditAmortizationTableActions,
  customAppearanceCallback,
} from "./config/table";
import { StyledAmortizationContainer } from "./styles";
import { ISelectedProductState } from "./types";
import { validateCreditsAndAmortization } from "./utils";

function CreditAmortization() {
  const { credit_id } = useParams();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const { credits, setCredits } = useContext(CreditsContext);
  const { user, accessToken } = useAuth();

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

  const handleSortProduct = async () => {
    if (!credit_id || !user || !accessToken) return;

    const { newCredits, selectedCredit } = await validateCreditsAndAmortization(
      credits,
      credit_id,
      user?.identification,
      accessToken,
    );

    setCredits(newCredits);

    if (!selectedCredit) return;

    setSelectedProduct({
      credit: selectedCredit,
      option: {
        id: selectedCredit.id,
        title: selectedCredit.title,
        value: selectedCredit.description,
      },
    });

    setProductsOptions(
      newCredits.map((credit) => ({
        id: credit.id,
        value: credit.description,
      })),
    );
  };

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, user, accessToken]);

  const handleChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: id } = event.target;
    navigate(`/my-credits/${id}/credit-amortization`);
  };

  const attributes =
    selectedProduct && extractCreditAmortizationAttrs(selectedProduct.credit);

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
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        {selectedProduct && selectedProduct.credit.amortization && (
          <Stack direction="column" gap="s300">
            <Select
              id="creditProducts"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions}
              value={selectedProduct.option.id}
              isFullWidth
            />
            <Box
              title={selectedProduct.option.title}
              subtitle={selectedProduct.option.id}
              icon={<MdOutlineAttachMoney size={34} />}
              collapsing={{ start: true, allow: false }}
              tags={selectedProduct.credit.tags}
            >
              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s100">
                {attributes?.map((attr) => (
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
                portalId="modals"
                titles={amortizationTableTitles}
                breakpoints={amortizationTableBreakpoints}
                actions={creditAmortizationTableActions}
                entries={amortizationNormalizeEntries(
                  selectedProduct.credit.amortization,
                )}
                customAppearance={customAppearanceCallback}
                hideMobileResume
              />
            </StyledAmortizationContainer>
          </Stack>
        )}

        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditAmortization };
