import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs, IBreadcrumbItem } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack } from "react-icons/md";
import {
  movementsTableBreakpoints,
  movementsTableTitles,
} from "../MyCredits/config/tables";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

interface CreditMovementsUIProps {
  crumbsMovements: IBreadcrumbItem[];
  handleChangeProduct: (option: ISelectOption) => void;
  handleAddMovements: () => void;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  creditTableActions: IAction[];
  loading: boolean;
}

function CreditMovementsUI(props: CreditMovementsUIProps) {
  const {
    crumbsMovements,
    handleAddMovements,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    creditTableActions,
    loading,
  } = props;

  const mquery = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMovements} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
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
          <StyledMovementsContainer>
            <Table
              id="modals"
              titles={movementsTableTitles}
              breakpoints={movementsTableBreakpoints}
              actions={creditTableActions}
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

export { CreditMovementsUI };
