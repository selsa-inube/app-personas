import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { inube } from "@design/tokens";
import { Divider } from "@design/layout/Divider";
import { CardMovement } from "@components/cards/cards/CardMovement";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { crumbsSavingsAccountMovements } from "./config/navigation";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";
import { EMovementType } from "src/model/entity/product";

interface SavingsAccountMovementsUIProps {
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddMovements: () => void;
  selectedProduct: ISelectedProductState;
  productsOptions: ISelectOption[];
  loading: boolean;
  productId?: string;
}

function SavingsAccountMovementsUI(props: SavingsAccountMovementsUIProps) {
  const {
    handleAddMovements,
    handleChangeProduct,
    selectedProduct,
    productsOptions,
    loading,
    productId,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsSavingsAccountMovements(productId)} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
          icon={<MdArrowBack />}
          navigatePage={`/my-savings/account/${productId}`}
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
            value={selectedProduct.option}
            isFullWidth
            readOnly={productsOptions.length === 1}
          />
          <StyledMovementsContainer>
            <Stack direction="column" gap="s200" width="100%">
              {selectedProduct.movements && (
                <Stack direction="column" gap="s500">
                  <Stack direction="column" gap="s200">
                    {selectedProduct.movements &&
                      selectedProduct.movements.map((movement, index) => (
                        <Stack direction="column" gap="s200" key={movement.id}>
                          {index !== 0 && <Divider dashed />}
                          <CardMovement
                            movementType={movement.type || EMovementType.CREDIT}
                            description={movement.description}
                            totalValue={movement.totalValue || 0}
                            date={movement.date}
                            reference={movement.reference}
                          />
                        </Stack>
                      ))}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </StyledMovementsContainer>
          <Stack justifyContent="center">
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
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { SavingsAccountMovementsUI };
