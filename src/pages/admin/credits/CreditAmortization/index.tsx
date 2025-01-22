import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { ExportModal } from "@components/modals/general/ExportModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import { Button } from "@inubekit/button";
import { Breadcrumbs, Grid, Stack } from "@inubekit/inubekit";
import jsPDF from "jspdf";
import { useContext, useEffect, useState } from "react";
import {
  MdArrowBack,
  MdOutlineAttachMoney,
  MdOutlineIosShare,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { CreditsContext } from "src/context/credits";
import { formatSecondaryDate } from "src/utils/dates";
import { convertHTMLToPDF, convertJSXToHTML } from "src/utils/print";
import { extractCreditAmortizationAttrs } from "./config/product";
import { StyledAmortizationContainer } from "./styles";
import { ISelectedProductState } from "./types";
import {
  getAmortizationDocument,
  renderAmortizationTable,
} from "./utilRenders";
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
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [showExportModal, setShowExportModal] = useState(false);

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

  const handleDownloadDocument = () => {
    if (!selectedProduct?.credit) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(getAmortizationDocument(selectedProduct)),
      undefined,
      (pdf) => {
        pdf.save(`plan-de-pagos-${formatSecondaryDate(today, true)}.pdf`);
      },
    );
  };

  const handleShareDocument = () => {
    if (!selectedProduct?.credit) return;

    const today = new Date();

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter",
      compress: true,
    });

    convertHTMLToPDF(
      doc,
      convertJSXToHTML(getAmortizationDocument(selectedProduct)),
      undefined,
      (pdf) => {
        const pdfBlob = pdf.output("blob");

        if (navigator.share) {
          navigator.share({
            title: "Plan de pagos",
            text: `Plan de pagos ${formatSecondaryDate(today, true)}`,
            files: [
              new File(
                [pdfBlob],
                `plan-de-pagos-${formatSecondaryDate(today, true)}.pdf`,
                {
                  type: "application/pdf",
                },
              ),
            ],
          });
        } else {
          console.warn("Web Share API is not supported in this browser");
        }
      },
    );
  };

  const handleToggleExportModal = () => {
    setShowExportModal(!showExportModal);
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
                iconBefore={<MdOutlineIosShare />}
                spacing="compact"
                onClick={handleToggleExportModal}
              >
                Exportar
              </Button>
            </Stack>
          </Stack>
        )}

        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>

      {showExportModal && (
        <ExportModal
          portalId="modals"
          onDownload={handleDownloadDocument}
          onShare={handleShareDocument}
          onCloseModal={handleToggleExportModal}
        />
      )}
    </>
  );
}

export { CreditAmortization };
