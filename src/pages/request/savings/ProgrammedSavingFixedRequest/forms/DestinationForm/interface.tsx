import { DestinationCard } from "@components/cards/DestinationCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { formatDestinationAttributes } from "./config/format";
import { loadingProductsData } from "./config/loading";
import { IDestinationEntry, IProgrammedSavingProduct } from "./types";

interface DestinationFormUIProps {
  formik: FormikProps<IDestinationEntry>;
  loadingProducts: boolean;
  onChangeProduct: (value: IProgrammedSavingProduct) => void;
}

function DestinationFormUI(props: DestinationFormUIProps) {
  const { formik, loadingProducts, onChangeProduct } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Stack direction="column" gap={inube.spacing.s200}>
          <>
            <Text type="title" size="small">
              ¿Cuál es el producto que deseas?
            </Text>

            {formik.values.products.length === 0 && !loadingProducts && (
              <Text type="body" size="medium" appearance="gray">
                El ahorro que selecciónate no tiene productos disponibles.
              </Text>
            )}

            <Grid
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              gap={inube.spacing.s200}
            >
              {loadingProducts &&
                loadingProductsData.map((product, index) => (
                  <DestinationCard
                    id={product.id}
                    title={product.title}
                    description={product.description || ""}
                    checked={false}
                    attributes={formatDestinationAttributes(product)}
                    key={index}
                    onClick={() => true}
                    loading
                  />
                ))}

              {formik.values.products.map((product) => (
                <DestinationCard
                  id={product.id}
                  title={product.title}
                  description={product.description || ""}
                  checked={formik.values.product?.id === product.id}
                  attributes={formatDestinationAttributes(product)}
                  key={product.id}
                  onClick={() => onChangeProduct(product)}
                />
              ))}
            </Grid>
          </>
        </Stack>
      </Stack>
    </form>
  );
}

export { DestinationFormUI };
