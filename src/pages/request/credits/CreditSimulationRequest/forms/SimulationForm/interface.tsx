import { BoxAttribute } from "@components/cards/BoxAttribute";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Divider } from "@design/layout/Divider";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { peridiocityDM } from "src/model/domains/general/peridiocity";

interface SimulationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleChange: (fieldName: string, value: string) => void;
}

function SimulationFormUI(props: SimulationFormUIProps) {
  const { formik, loading, customHandleChange } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Stack direction="column" gap="s400">
        <Fieldset title="Caracteristicas">
          <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
            <Select
              label="Destinación"
              name="creditDestination"
              id="creditDestination"
              value={formik.values.creditDestination}
              size="compact"
              isFullWidth
              readOnly
            />

            <Select
              label="Producto"
              name="product"
              id="product"
              value={formik.values.creditDestination}
              size="compact"
              isFullWidth
              readOnly
            />
          </Grid>

          <Text type="title" size="small">
            Cupos máximos disponibles
          </Text>
        </Fieldset>

        <Fieldset title="Simulador de crédito">
          <Stack direction="column" gap="s250">
            <Stack direction="column" gap="s200">
              <Stack
                padding={`${inube.spacing.s050} ${inube.spacing.s200}`}
                gap="s100"
              >
                <Text type="label" size="large">
                  Simular con el valor de la cuota
                </Text>
              </Stack>

              <Grid gap="s300" templateColumns={isMobile ? "1fr" : "1fr 1fr"}>
                <TextField
                  label="¿Cuánto dinero necesitas?"
                  placeholder="Ingresa el valor a solicitar"
                  name="amount"
                  id="amount"
                  value={formik.values.amount}
                  type="text"
                  iconAfter={<MdOutlineModeEdit size={18} />}
                  errorMessage={formik.errors.amount}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={stateValue("amount")}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  validMessage="El valor es válido"
                  isRequired
                />

                <Select
                  label="Periodicidad"
                  name="peridiocity"
                  id="peridiocity"
                  value={formik.values.peridiocity}
                  size="compact"
                  isFullWidth
                  options={peridiocityDM.options}
                  handleBlur={formik.handleBlur}
                  errorMessage={formik.errors.peridiocity}
                  isDisabled={loading}
                  state={stateValue("peridiocity")}
                  handleChange={formik.handleChange}
                  readOnly
                />

                <TextField
                  label="Plazo"
                  placeholder="Ingresa el plazo"
                  name="deadline"
                  id="deadline"
                  value={formik.values.deadline}
                  type="text"
                  iconAfter={<MdOutlineModeEdit size={18} />}
                  errorMessage={formik.errors.deadline}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={stateValue("deadline")}
                  handleBlur={formik.handleBlur}
                  handleChange={formik.handleChange}
                  validMessage="El plazo es válido"
                  isRequired
                />
              </Grid>

              <Stack width="100%" justifyContent="flex-end">
                <Button>Simular</Button>
              </Stack>
            </Stack>

            <Divider dashed />

            <Stack direction="column" gap="s300">
              <Text type="title" size="small">
                Resultados de la simulación
              </Text>
              <Stack direction="column" gap="s150">
                <BoxAttribute label="Cuota mensual:" value="$ 531.063" />
                <BoxAttribute label="Plazo:" value="48 Meses" />
                <BoxAttribute label="Tasa de interés:" value="2.84 % N.M.V" />
                <BoxAttribute
                  label="Intereses de ajuste al ciclo:"
                  value="$ 200.000"
                />
                <BoxAttribute
                  label="Valor neto a recibir:"
                  value="$ 28.130.279"
                />
              </Stack>
            </Stack>
          </Stack>
        </Fieldset>
      </Stack>
    </form>
  );
}

export { SimulationFormUI };
