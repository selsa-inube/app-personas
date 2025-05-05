import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { Title } from "@design/data/Title";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IOption,
  Select,
  Stack,
} from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { EMovementType } from "src/model/entity/product";
import { generateAttributes } from "./config/attributeRecord";
import { crumbsCardMovements } from "./config/navigation";
import { StyledContainer, StyledItem } from "./styles";
import { ISelectedProductState } from "./types";
import { useQuickLinks } from "@hooks/useQuickLinks";

interface CardMovementsUIProps {
  cardId?: string;
  creditQuotaId?: string;
  productsOptions: IOption[];
  selectedProduct: ISelectedProductState;
  loading: boolean;
  handleChangeProduct: (name: string, value: string) => void;
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
  const quickLinksArray = useQuickLinks();

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
              name="movements"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions}
              value={selectedProduct.option}
              disabled={productsOptions.length === 1}
              fullwidth
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
        {isDesktop && <QuickAccess links={quickLinksArray} />}
      </Grid>
    </>
  );
}

export { CardMovementsUI };
