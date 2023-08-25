import { Box } from "@components/cards/Box";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Text } from "@design/data/Text";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import creditsMock from "@mocks/products/credits/credits.mocks";
import { useEffect, useState } from "react";
import {
  MdArrowBack,
  MdOpenInNew,
  MdOutlineAssignmentTurnedIn,
  MdOutlineAssignment,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AmountValue } from "../MyCredits/AmountValue";
import { crumbsMyCredits } from "../MyCredits/config/navigation";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "../MyCredits/config/tables";
import { creditBox } from "./config/credit";
import { StyledIconView, StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => <AmountValue value={movement.totalValue} />,
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

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  const mquery = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id, isMobile]);

  const handleSortProduct = () => {
    const creditsOptions = creditsMock.map((credit) => {
      const productOption = {
        id: credit.id,
        value: `${credit.title} - ${credit.id}`,
      };

      if (credit.id === credit_id) {
        setSelectedProduct({
          data: {
            ...credit,
            movements: credit.movements?.slice(0, isMobile ? 5 : 10),
          },
          option: productOption,
        });
      }

      return productOption;
    });

    setProductsOptions(creditsOptions);
  };

  const handleChangeProduct = (option: ISelectOption) => {
    navigate(`/my-credits/${option.id}`);
  };

  if (!selectedProduct) return null;

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMyCredits} />
        <Title
          title="Consulta de créditos"
          subtitle="Información detallada de tus productos de crédito"
          icon={<MdArrowBack />}
          navigatePage="/my-credits"
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
            title={selectedProduct.data.title}
            subtitle={selectedProduct.data.id}
            button={{
              label: "Plan de pagos",
              icon: <MdOutlineAssignment />,
              path: `/my-credits/${credit_id}/credit-amortization`,
            }}
            {...creditBox}
          >
            <Stack direction="column" gap="s100">
              <Stack gap="s100" direction={isMobile ? "column" : "row"}>
                <BoxAttribute label="Fecha de préstamo" value="15/Ene/2023" />
                <BoxAttribute label="Valor de préstamo" value="$8.300.000" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "column" : "row"}>
                <BoxAttribute label="Próximo vencimiento" value="15/Abr/2023" />
                <BoxAttribute label="Próximo pago" value="$500.000" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "column" : "row"}>
                <BoxAttribute label="Cuota" value="5 de 12" />
                <BoxAttribute label="Periodicidad" value="Mensual" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "column" : "row"}>
                <BoxAttribute
                  label="Medio de pago"
                  value="Grúas de occidente"
                />
                <BoxAttribute label="Tasa de interés" value="3,04 % NAMV" />
              </Stack>
            </Stack>
          </Box>

          <Stack direction="column" gap="s200" alignItems="flex-start">
            <Text type="title" size="medium">
              Últimos movimientos
            </Text>
            <StyledMovementsContainer>
              <Table
                id="modals"
                titles={movementsTableTitles}
                breakpoints={movementsTableBreakpoints}
                actions={creditTableActions}
                entries={selectedProduct.data.movements || []}
                pageLength={selectedProduct.data.movements?.length || 0}
                hideMobileResume
              />
              <Button
                type="link"
                appearance="dark"
                variant="none"
                iconBefore={<MdOutlineAssignmentTurnedIn />}
                path={`/my-credits/${credit_id}/credit-movements`}
              >
                Movimientos
              </Button>
            </StyledMovementsContainer>
          </Stack>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { Credit };
