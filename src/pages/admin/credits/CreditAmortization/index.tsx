import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { useContext, useEffect, useRef, useState } from "react";
import {
  MdArrowBack,
  MdOutlineAttachMoney,
  MdOutlineFileDownload,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CreditsContext } from "src/context/credits";
import { copyElementToIFrame } from "src/utils/print";
import { extractAttribute } from "src/utils/products";
import { AmortizationDocument } from "./AmortizationDocument";
import { extractCreditAmortizationAttrs } from "./config/product";
import {
  amortizationNormalizeEntries,
  amortizationTableBreakpoints,
  amortizationTableTitles,
  creditAmortizationTableActions,
  customAppearanceCallback,
} from "./config/table";
import {
  StyledAmortizationContainer,
  StyledAmortizationDocument,
} from "./styles";
import { ISelectedProductState } from "./types";
import { validateCreditsAndAmortization } from "./utils";

const renderAmortizationTable = (
  selectedProduct?: ISelectedProductState,
  allColumns?: boolean,
) => {
  if (!selectedProduct || !selectedProduct.credit.amortization) return;

  return (
    <Table
      portalId="modals"
      titles={amortizationTableTitles}
      breakpoints={allColumns ? undefined : amortizationTableBreakpoints}
      actions={creditAmortizationTableActions}
      entries={amortizationNormalizeEntries(
        selectedProduct.credit.amortization,
      )}
      customAppearance={customAppearanceCallback}
      hideMobileResume
    />
  );
};

function CreditAmortization() {
  const { credit_id } = useParams();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const { credits, setCredits } = useContext(CreditsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const amortizationDocRef = useRef<HTMLIFrameElement>(null);

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
      user.identification,
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

  const handlePrintDocument = () => {
    if (!amortizationDocRef.current || !selectedProduct?.credit) return;
    const amortizationTable = renderAmortizationTable(selectedProduct, true);
    const documentAttributes = selectedProduct.credit.attributes;

    const loanDate = extractAttribute(documentAttributes, "loan_date");
    const nextPayment = extractAttribute(documentAttributes, "next_payment");
    const nextPaymentValue = extractAttribute(
      documentAttributes,
      "next_payment_value",
    );
    const loanValue = extractAttribute(documentAttributes, "loan_value");
    const periodicity = extractAttribute(documentAttributes, "periodicity");
    const paymentMethod = extractAttribute(
      documentAttributes,
      "payment_method",
    );

    copyElementToIFrame(
      <AmortizationDocument
        productName={selectedProduct.option.title}
        productNumber={selectedProduct.option.id}
        loanDate={loanDate?.value.toString() || ""}
        nextPaymentDate={nextPayment?.value.toString() || ""}
        loanValue={Number(loanValue?.value || 0)}
        nextPaymentValue={Number(nextPaymentValue?.value || 0)}
        periodicity={periodicity?.value.toString() || ""}
        paymentMethod={paymentMethod?.value.toString() || ""}
        tableElement={amortizationTable}
      />,
      amortizationDocRef.current,
    );

    setTimeout(() => {
      amortizationDocRef?.current?.contentWindow?.print();
    }, 500);
  };

  const amortizationTable = renderAmortizationTable(selectedProduct, false);

  const attributes =
    selectedProduct && extractCreditAmortizationAttrs(selectedProduct.credit);

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsAmortization} />
        <Title
          title="Plan de pagos"
          subtitle="Detalle de la amortización del crédito"
          icon={<MdArrowBack />}
          navigatePage={`/my-credits/${credit_id}`}
        />
      </Stack>

      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        {selectedProduct && selectedProduct.credit.amortization && (
          <Stack direction="column" gap={inube.spacing.s300}>
            <Select
              id="creditProducts"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions}
              value={selectedProduct.option.id}
              isFullWidth
              readOnly={productsOptions.length === 1}
            />
            <Box
              title={selectedProduct.option.title}
              subtitle={selectedProduct.option.id}
              icon={<MdOutlineAttachMoney size={34} />}
              collapsing={{ start: true, allow: false }}
              tags={selectedProduct.credit.tags}
            >
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                gap={inube.spacing.s100}
                autoRows="auto"
              >
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
              {amortizationTable}
            </StyledAmortizationContainer>

            <Stack width="100%" justifyContent="flex-end">
              <Button
                iconBefore={<MdOutlineFileDownload />}
                spacing="compact"
                onClick={handlePrintDocument}
              >
                Descargar
              </Button>
            </Stack>

            <StyledAmortizationDocument ref={amortizationDocRef} />
          </Stack>
        )}

        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditAmortization };
