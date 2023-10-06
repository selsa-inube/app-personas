import { Text } from "@design/data/Text";
import { RadioCard } from "@design/input/RadioCard";
import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { destinationProducts } from "@mocks/products/credits/request.mocks";
import { FormikValues } from "formik";

interface DestinationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (fieldName: string, value: string) => void;
}

function DestinationFormUI(props: DestinationFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const creditDestinationDM = getDomainById("creditDestination");

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
            handleBlur={formik.handleBlur}
            errorMessage={formik.errors.creditDestination}
            isDisabled={loading}
            state={stateValue("creditDestination")}
            handleChange={formik.handleChange}
          />
        </Stack>
        <Stack direction="column" gap="s200">
          {formik.values.creditDestination && (
            <>
              <Text type="title" size="small">
                ¿Cuál es el producto que deseas?
              </Text>

              <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap="s200">
                {destinationProducts[
                  formik.values
                    .creditDestination as keyof typeof destinationProducts
                ].map((product) => (
                  <RadioCard
                    id={formik.values.creditDestination}
                    name={formik.values.creditDestination}
                    title={product.title}
                    description={product.description}
                    onClick={() => customHandleChange("product", product.id)}
                    checked={formik.values.product === product.id}
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
