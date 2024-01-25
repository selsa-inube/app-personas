import { Text } from "@design/data/Text";
import { RadioCard } from "@design/input/RadioCard";
import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { destinationProductsMock } from "@mocks/products/credits/request.mocks";
import { FormikValues } from "formik";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { getFieldState } from "src/utils/forms/forms";
import { productGenerateRecommendation } from "../../utils";

const creditDestinationDM = getDomainById("creditDestination");

interface DestinationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  handleChangeRadio: (fieldName: string, value: string) => void;
}

function DestinationFormUI(props: DestinationFormUIProps) {
  const { formik, loading, handleChangeRadio } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Stack direction="column" gap="s200">
          <Text type="title" size="small">
            ¿Cuál es la destinación del crédito?
          </Text>
          <Select
            name="creditDestination"
            id="creditDestination"
            value={formik.values.creditDestination}
            size="compact"
            isFullWidth
            options={creditDestinationDM}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.creditDestination}
            isDisabled={loading}
            state={getFieldState(formik, "creditDestination")}
            onChange={formik.handleChange}
          />
        </Stack>
        <Stack direction="column" gap="s200">
          {formik.values.creditDestination && (
            <>
              <Text type="title" size="small">
                ¿Cuál es el producto que deseas?
              </Text>

              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s200">
                {destinationProductsMock[
                  formik.values
                    .creditDestination as keyof typeof destinationProductsMock
                ].map(
                  (product) =>
                    product && (
                      <RadioCard
                        id={formik.values.creditDestination}
                        name={formik.values.creditDestination}
                        icon={
                          product.id === productGenerateRecommendation?.id ? (
                            <MdOutlineAutoAwesome />
                          ) : undefined
                        }
                        title={product.value}
                        description={product.description || ""}
                        checked={formik.values.product === product.id}
                        key={product.id}
                        onClick={() => handleChangeRadio("product", product.id)}
                      />
                    ),
                )}
              </Grid>
            </>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

export { DestinationFormUI };
