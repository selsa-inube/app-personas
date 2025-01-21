import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { FormikProps } from "formik";
import { MdPercent } from "react-icons/md";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormUIProps {
  formik: FormikProps<IBeneficiariesEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  customHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BeneficiariesFormUI(props: BeneficiariesFormUIProps) {
  const { formik, loading, withSubmit, customHandleChange } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <form>
      <Stack direction="column" alignItems="flex-end" gap={inube.spacing.s300}>
        <Grid
          templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
          width="100%"
        >
          {formik.values.beneficiaries.length > 0 &&
            formik.values.beneficiaries.map((beneficiary) => (
              <TextField
                key={beneficiary.id}
                label={beneficiary.name}
                placeholder="Digita el porcentaje de beneficio"
                name={beneficiary.id}
                id={beneficiary.id}
                type="number"
                value={beneficiary.percentage || ""}
                iconAfter={<MdPercent size={18} />}
                isDisabled={loading}
                size="compact"
                isFullWidth
                onBlur={formik.handleBlur}
                onChange={customHandleChange}
              />
            ))}
        </Grid>
        <Stack gap={inube.spacing.s150} alignItems="center">
          <Text type="body" size="medium">
            Total porcentaje de participación:
          </Text>
          <Text
            type="title"
            size="medium"
            appearance={formik.values.totalPercentage > 100 ? "danger" : "dark"}
          >
            {formik.values.totalPercentage} %
          </Text>
        </Stack>

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={loading || !formik.dirty || !formik.isValid}
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { BeneficiariesFormUI };
