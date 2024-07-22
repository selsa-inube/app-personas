import { DestinationCard } from "@components/cards/credits/DestinationCard";
import { Text } from "@design/data/Text";
import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikProps } from "formik";
import { getFieldState } from "src/utils/forms/forms";
import { loadingProductsData } from "./config/loading";
import { IDestinationEntry, IDestinationProduct } from "./types";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface DestinationFormUIProps {
  formik: FormikProps<IDestinationEntry>;
  loading?: boolean;
  loadingProducts: boolean;
  onChangeProduct: (value: IDestinationProduct) => void;
  onChangeDestination: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function DestinationFormUI(props: DestinationFormUIProps) {
  const {
    formik,
    loading,
    loadingProducts,
    onChangeProduct,
    onChangeDestination,
  } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Text type="title" size="small">
            ¿Cuál es el destino del crédito?
          </Text>
          <Select
            name="creditDestination"
            id="creditDestination"
            value={formik.values.creditDestination?.id || ""}
            size="compact"
            isFullWidth
            options={formik.values.destinations}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.creditDestination}
            isDisabled={loading}
            state={getFieldState(formik, "creditDestination")}
            onChange={onChangeDestination}
          />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          {formik.values.creditDestination &&
            formik.values.creditDestination.id !== "other" && (
              <>
                <Text type="title" size="small">
                  ¿Cuál es el producto que deseas?
                </Text>

                <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s200">
                  {loadingProducts &&
                    loadingProductsData.map((product) => (
                      <DestinationCard
                        id={product.id}
                        title={product.title}
                        description={product.description || ""}
                        checked={false}
                        maxAmount={product.maxAmount}
                        maxRate={product.maxRate}
                        maxDeadline={product.maxDeadline}
                        key={product.id}
                        onClick={() => true}
                        loading
                      />
                    ))}

                  {formik.values.products.map((product) => (
                    <DestinationCard
                      id={product.id}
                      title={product.title}
                      description={product.description || ""}
                      checked={formik.values.selectedProduct?.id === product.id}
                      maxAmount={product.maxAmount}
                      maxRate={product.maxRate}
                      maxDeadline={product.maxDeadline}
                      key={product.id}
                      onClick={() => onChangeProduct(product)}
                    />
                  ))}
                </Grid>
              </>
            )}
        </Stack>
      </Stack>
    </form>
  );
}

export { DestinationFormUI };
