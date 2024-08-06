import { Button } from "@design/input/Button";
import { TextField } from "@design/input/TextField";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";
import { usersMock } from "@mocks/users/users.mocks";
import { FormikValues } from "formik";
import { MdPercent } from "react-icons/md";

interface BeneficiariesFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  percentage: number;
  withSubmit?: boolean;
  customHandleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function BeneficiariesFormUI(props: BeneficiariesFormUIProps) {
  const { formik, loading, percentage, withSubmit, customHandleChange } = props;

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
          {usersMock.length > 0 &&
            usersMock[0].familyGroup?.map((familyMember) => (
              <TextField
                key={familyMember.identification.identificationNumber}
                label={`${familyMember.identification.firstName} ${familyMember.identification.secondName || ""} ${familyMember.identification.firstLastName} ${familyMember.identification.secondLastName || ""}`}
                placeholder="Digita el porcentaje de beneficio"
                name={familyMember.identification.identificationNumber.toString()}
                id={familyMember.identification.identificationNumber.toString()}
                type="number"
                value={
                  formik.values[
                    familyMember.identification.identificationNumber.toString()
                  ] || ""
                }
                iconAfter={<MdPercent size={18} />}
                errorMessage={
                  formik.errors[
                    familyMember.identification.identificationNumber.toString()
                  ]
                }
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
            appearance={percentage > 100 ? "danger" : "dark"}
          >
            {percentage} %
          </Text>
        </Stack>

        {withSubmit && (
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={formik.handleReset}
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
