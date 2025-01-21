import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider, Grid, Stack } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsCardMovements } from "./config/navigation";
import { StyledContainer, StyledItem } from "./styles";
import { ISelectedProductState } from "./types";

interface CardMovementsUIProps {
  cardId?: string;
  creditQuotaId?: string;
  productsOptions: ISelectOption[];
  selectedProduct: ISelectedProductState;
  loading: boolean;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddMovements: () => void;
}

function CardMovementsUI(props: CardMovementsUIProps) {
  const {
    cardId,
    creditQuotaId,
    productsOptions,
    selectedProduct,
    loading,
    handleChangeProduct,
    handleAddMovements,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsCardMovements(cardId, creditQuotaId)} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
          icon={<MdArrowBack />}
          navigatePage={`/my-cards/${cardId}`}
        />
      </Stack>
      <Grid
        gap={inube.spacing.s600}
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
      >
        <Stack direction="column" gap={inube.spacing.s400}>
          <Stack direction="column" gap={inube.spacing.s300}>
            <Select
              id="movements"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions}
              value={selectedProduct.option}
              readOnly={productsOptions.length === 1}
              isFullWidth
            />
          </Stack>
          <Stack direction="column" gap={inube.spacing.s300}>
            <StyledContainer>
              {selectedProduct.movements
                .filter(
                  (movement) =>
                    typeof movement.totalValue === "number" &&
                    !isNaN(movement.totalValue) &&
                    movement.type !== undefined,
                )
                .map((movement, index) => (
                  <Stack direction="column" key={movement.id}>
                    {index !== 0 && <Divider dashed />}
                    <StyledItem>
                      <RecordCard
                        id={movement.id}
                        type={movement.type as EMovementType}
                        description={movement.description}
                        value={movement.totalValue}
                        attributes={generateAttributes(movement)}
                      />
                    </StyledItem>
                  </Stack>
                ))}
            </StyledContainer>
            <Stack direction="column" alignItems="center">
              <Button
                appearance="primary"
                variant="none"
                iconBefore={<MdAdd />}
                onClick={handleAddMovements}
                loading={loading}
                disabled={
                  selectedProduct.movements.length ===
                  selectedProduct.totalMovements
                }
              >
                Ver más movimientos
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CardMovementsUI };
