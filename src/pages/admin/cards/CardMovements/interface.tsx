import { Title } from "@design/data/Title";
import { Stack } from "@design/layout/Stack";
import { Breadcrumbs } from "@design/navigation/Breadcrumbs";
import { MdArrowBack } from "react-icons/md";
import { crumbsCardMovements } from "./config/navigation";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { inube } from "@design/tokens";
import { QuickAccess } from "@components/cards/QuickAccess";
import { quickLinks } from "@config/quickLinks";
import { Select } from "@design/input/Select";
import { ISelectOption } from "@design/input/Select/types";
import { ISelectedProductState } from "./types";

interface CardMovementsUIProps {
  cardId?: string;
  creditQuotaId?: string;
  productsOptions: ISelectOption[];
  selectedProduct: ISelectedProductState;
  handleChangeProduct: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CardMovementsUI(props: CardMovementsUIProps) {
  const {
    cardId,
    creditQuotaId,
    productsOptions,
    selectedProduct,
    handleChangeProduct,
  } = props;
  const isDesktop = useMediaQuery("(min-width: 1400px)");
  return (
    <>
      <Stack direction="column" gap="s300">
        <Breadcrumbs crumbs={crumbsCardMovements(cardId, creditQuotaId)} />
        <Title
          title="Movimientos"
          subtitle="Movimientos recientes del producto"
          icon={<MdArrowBack />}
          navigatePage={`/my-cards/${cardId}`}
        />
      </Stack>
      <Grid
        gap="s600"
        margin={
          isDesktop ? `${inube.spacing.s600} 0 0` : `${inube.spacing.s300} 0 0`
        }
        templateColumns={isDesktop ? "1fr 250px" : "1fr"}
      >
        <Stack direction="column" gap="s400">
          <Stack direction="column" gap="s300">
            <Select
              id="movements"
              onChange={handleChangeProduct}
              label="Selección de producto"
              options={productsOptions}
              value={selectedProduct.option}
              isFullWidth
            />
          </Stack>
        </Stack>
        {isDesktop && <QuickAccess links={quickLinks} />}
      </Grid>
    </>
  );
}

export { CardMovementsUI };
