import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Table } from "@design/data/Table";
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
import {
  creditMovementsNormalizeEntries,
  creditMovementsTableActions,
} from "./config/table";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

interface CreditMovementsUIProps {
  crumbsMovements: IBreadcrumbItem[];
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddMovements: () => void;
  selectedProduct?: ISelectedProductState;
  productsOptions: ISelectOption[];
  loading: boolean;
  credit_id?: string;
}

function CreditMovementsUI(props: CreditMovementsUIProps) {
  const {
    crumbsMovements,
    handleAddMovements,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    loading,
    credit_id,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsMovements} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
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
        <Stack direction="column" gap="s300">
          <Select
            id="creditProducts"
            onChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct?.option}
            isFullWidth
            readOnly={productsOptions.length === 1}
          />
          {selectedProduct && (
            <StyledMovementsContainer>
              <Table
                portalId="modals"
                titles={movementsTableTitles}
                breakpoints={movementsTableBreakpoints}
                actions={creditMovementsTableActions}
                entries={creditMovementsNormalizeEntries(
                  selectedProduct.movements,
                )}
                pageLength={selectedProduct.movements.length}
                hideMobileResume
              />
              <Button
                appearance="primary"
                variant="none"
                iconBefore={<MdAdd />}
                onClick={handleAddMovements}
                load={loading}
                disabled={
                  selectedProduct.movements.length ===
                  selectedProduct.totalMovements
                }
              >
                Ver más movimientos
              </Button>
            </StyledMovementsContainer>
          )}
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CreditMovementsUI };
