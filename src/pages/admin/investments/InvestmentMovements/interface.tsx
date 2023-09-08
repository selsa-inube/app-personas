import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { crumbsInvestmentMovements } from "./config/navigation";
import {
  investmentMovementsTableActions,
  investmentMovementsTableBreakpoints,
  investmentMovementsTableTitles,
} from "./config/table";
import { ISelectedProductState } from "./types";
import { StyledMovementsContainer } from "./styles";

interface InvestmentMovementsUIProps {
  handleChangeProduct: (option: ISelectOption) => void;
  handleAddMovements: () => void;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  loading: boolean;
  productId?: string;
}

function InvestmentMovementsUI(props: InvestmentMovementsUIProps) {
  const {
    handleAddMovements,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    loading,
    productId,
  } = props;
  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsInvestmentMovements(productId)} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
          icon={<MdArrowBack />}
          navigatePage={`/my-investments/${productId}`}
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
            value={selectedProduct.option}
            isFullWidth
          />
          <StyledMovementsContainer>
            <Table
              id="modals"
              titles={investmentMovementsTableTitles}
              breakpoints={investmentMovementsTableBreakpoints}
              actions={investmentMovementsTableActions}
              entries={selectedProduct.movements}
              pageLength={selectedProduct.movements.length}
              hideMobileResume
            />
            <Button
              appearance="primary"
              variant="none"
              iconBefore={<MdAdd />}
              handleClick={handleAddMovements}
              load={loading}
              disabled={
                selectedProduct.movements.length ===
                selectedProduct.totalMovements
              }
            >
              Ver más movimientos
            </Button>
          </StyledMovementsContainer>
        </Stack>
        {mquery && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { InvestmentMovementsUI };
