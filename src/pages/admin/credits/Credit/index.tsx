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
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { crumbsMyCredits } from "../MyCredits/config/navigation";
import { MovementValue } from "./MovementValue";
import {
  creditBox,
  creditTableBreakpoints,
  creditTableTitles,
} from "./config/credit";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

const creditTableActions: IAction[] = [
  {
    id: "1",
    actionName: "Valor",
    content: (movement) => <MovementValue movement={movement} />,
  },
  {
    id: "2",
    actionName: "Ver",
    content: () => <MdOpenInNew />,
  },
];

function Credit() {
  const { credit_id } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ISelectedProductState>();
  const [productsOptions, setProductsOptions] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  const mquery = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(min-width: 750px)");

  useEffect(() => {
    handleSortProduct();
  }, [credit_id]);

  const handleSortProduct = () => {
    const creditsOptions: ISelectOption[] = creditsMock.map((credit) => ({
      id: credit.id,
      value: `${credit.title} - ${credit.id}`,
    }));

    setProductsOptions(creditsOptions);

    const foundCreditData = creditsMock.find(
      (credit) => credit.id === credit_id
    );
    const foundCreditOption = creditsOptions.find(
      (credit) => credit.id === credit_id
    );

    if (!foundCreditData || !foundCreditOption) return;

    setSelectedProduct({
      data: foundCreditData,
      option: foundCreditOption,
    });
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
          title="Consulta de Créditos"
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
            {...creditBox}
          >
            <Stack direction="column" gap="s100">
              <Stack gap="s100" direction={isMobile ? "row" : "column"}>
                <BoxAttribute label="Fecha de préstamo" value="15/Ene/2023" />
                <BoxAttribute label="Valor de préstamo" value="$8.300.000" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "row" : "column"}>
                <BoxAttribute label="Próximo vencimiento" value="15/Abr/2023" />
                <BoxAttribute label="Próximo pago" value="$500.000" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "row" : "column"}>
                <BoxAttribute label="Cuota" value="5 de 12" />
                <BoxAttribute label="Periodicidad" value="Mensual" />
              </Stack>
              <Stack gap="s100" direction={isMobile ? "row" : "column"}>
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
                titles={creditTableTitles}
                breakpoints={creditTableBreakpoints}
                actions={creditTableActions}
                entries={selectedProduct.data.movements || []}
                pageLength={selectedProduct.data.movements?.length || 0}
              />
              <Button
                appearance="dark"
                variant="none"
                iconBefore={<MdOutlineAssignmentTurnedIn />}
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
