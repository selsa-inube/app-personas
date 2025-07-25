import { DestinationCard } from "@components/cards/DestinationCard";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Grid, Select, Stack, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { isInvalid } from "src/utils/forms/forms";
import { formatDestinationAttributes } from "./config/format";
import { loadingProductsData } from "./config/loading";
import { ICreditDestinationProduct, IDestinationEntry } from "./types";

interface DestinationFormUIProps {
  formik: FormikProps<IDestinationEntry>;
  loading?: boolean;
  loadingProducts: boolean;
  onChangeProduct: (value: ICreditDestinationProduct) => void;
  onChangeDestination: (name: string, value: string) => void;
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
            value={formik.values.destination?.id || ""}
            size="compact"
            fullwidth
            options={formik.values.destinations}
            onBlur={formik.handleBlur}
            message={formik.errors.destination}
            disabled={loading}
            invalid={isInvalid(formik, "creditDestination")}
            onChange={onChangeDestination}
            placeholder="Selecciona el destino del dinero"
          />
        </Stack>
        {formik.values.destination &&
          formik.values.destination.id !== "other" && (
            <Stack direction="column" gap={inube.spacing.s200}>
              <>
                <Text type="title" size="small">
                  ¿Cuál es el producto que deseas?
                </Text>

                {formik.values.products.length === 0 && !loadingProducts && (
                  <Text type="body" size="medium" appearance="gray">
                    El destino que selecciónate no tiene productos relacionados.
                  </Text>
                )}

                <Grid
                  templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`}
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

                  {!loadingProducts &&
                    formik.values.products
                      .filter((product) => product.publishStatus === true)
                      .map((product) => (
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
          )}
      </Stack>
    </form>
  );
}

export { DestinationFormUI };
