import { QuickAccess } from "@components/cards/QuickAccess";
import { RecordCard } from "@components/cards/RecordCard";
import { CreditMovementModal } from "@components/modals/credit/CreditMovementModal";
import { quickLinks } from "@config/quickLinks";
import { Title } from "@design/data/Title";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Breadcrumbs, IBreadcrumbsRoute } from "@inubekit/breadcrumbs";
import { Button } from "@inubekit/button";
import { Divider, Grid, Stack, Text } from "@inubekit/inubekit";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { EMovementType, IMovement } from "src/model/entity/product";
import { generateAttributes } from "./config/attributeRecord";
import { StyledMovementsContainer } from "./styles";
import { ISelectedProductState } from "./types";

const renderMovements = (
  movements: IMovement[],
  loading: boolean,
  handleOpenModal: (movement: IMovement) => void,
) =>
  movements.map((movement, index) => (
    <Stack direction="column" gap={inube.spacing.s200} key={movement.id}>
      {index !== 0 && <Divider dashed />}
      <RecordCard
        id={movement.id}
        type={movement.type || EMovementType.CREDIT}
        description={movement.description}
        value={movement.totalValue || 0}
        loading={loading}
        attributes={generateAttributes(movement)}
        onClick={() => handleOpenModal(movement)}
        withExpandingIcon
      />
    </Stack>
  ));

interface CreditMovementsUIProps {
  crumbsMovements: IBreadcrumbsRoute[];
  selectedProduct?: ISelectedProductState;
  productsOptions: ISelectOption[];
  loading: boolean;
  credit_id?: string;
  creditMovementModal: boolean;
  selectedMovement?: IMovement;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddMovements: () => void;
  handleOpenModal: (movement: IMovement) => void;
  handleCloseModal: () => void;
}

function CreditMovementsUI(props: CreditMovementsUIProps) {
  const {
    crumbsMovements,
    selectedProduct,
    productsOptions,
    loading,
    credit_id,
    creditMovementModal,
    selectedMovement,
    handleAddMovements,
    handleChangeProduct,
    handleOpenModal,
    handleCloseModal,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Breadcrumbs crumbs={crumbsMovements} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
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
        <Stack direction="column" gap={inube.spacing.s300}>
          <Select
            id="creditProducts"
            onChange={handleChangeProduct}
            label="Selección de producto"
            options={productsOptions}
            value={selectedProduct?.option}
            isFullWidth
            readOnly={productsOptions.length === 1}
          />
          <StyledMovementsContainer $isMobile={isMobile}>
            <Stack direction="column" gap={inube.spacing.s200} width="100%">
              {selectedProduct && selectedProduct.movements.length > 0 ? (
                renderMovements(
                  selectedProduct.movements,
                  loading,
                  handleOpenModal,
                )
              ) : (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={inube.spacing.s100}
                >
                  <Text type="title" size="small" appearance="dark">
                    No tienes movimientos
                  </Text>
                  <Text
                    type="body"
                    size={isMobile ? "small" : "medium"}
                    appearance="gray"
                  >
                    Aun no posees movimientos en este producto.
                  </Text>
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
              loading={loading}
              disabled={
                selectedProduct?.movements.length ===
                selectedProduct?.totalMovements
              }
            >
              Ver más movimientos
            </Button>
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
      {creditMovementModal && selectedMovement && (
        <CreditMovementModal
          portalId="modals"
          onCloseModal={handleCloseModal}
          movement={selectedMovement}
        />
      )}
    </>
  );
}

export { CreditMovementsUI };
