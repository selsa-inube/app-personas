import { Text } from "@design/data/Text";
import { RadioCard } from "@design/input/RadioCard";
import { Select } from "@design/input/Select";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { destinationProductsMock } from "@mocks/products/credits/request.mocks";
import { FormikValues } from "formik";

interface DestinationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (fieldName: string, value: string) => void;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function DestinationFormUI(props: DestinationFormUIProps) {
  const { formik, loading, customHandleChange, customHandleBlur } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");

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
            handleBlur={customHandleBlur}
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
                {destinationProductsMock[
                  formik.values
                    .creditDestination as keyof typeof destinationProductsMock
                ].map(
                  (product) =>
                    product && (
                      <RadioCard
                        id={formik.values.creditDestination}
                        name={formik.values.creditDestination}
                        title={product.value}
                        description={product.description || ""}
                        onClick={() =>
                          customHandleChange("product", product.id)
                        }
                        checked={formik.values.product === product.id}
                      />
                    )
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
