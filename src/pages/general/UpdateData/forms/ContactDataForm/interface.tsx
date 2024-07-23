import { Button } from "@design/input/Button";
import { Fieldset } from "@design/input/Fieldset";
import { TextField } from "@design/input/TextField";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import { cityDM } from "src/model/domains/general/updateData/personalInformation/citydm";
import { departmentDM } from "src/model/domains/general/updateData/personalInformation/departamentdm";
import { getFieldState } from "src/utils/forms/forms";

interface ContactDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  isRequired: (fieldName: string) => boolean;
  withSubmit?: boolean;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const { formik, loading, isRequired, withSubmit } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
      >
        <Fieldset title="Dirección" size={isMobile ? "small" : "medium"}>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
          >
            <TextField
              label="País"
              placeholder="País"
              name="country"
              id="country"
              value={
                countryDM.valueOf(formik.values.country)?.value ||
                formik.values.country
              }
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.country}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "country")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El país es válido"
              isRequired={isRequired("country")}
              suggestions={countryDM.options}
              autocompleteChars={2}
              autocomplete
            />

            <TextField
              label="Estado / Departamento"
              placeholder="Estado o Departamento"
              name="stateOrDepartment"
              id="stateOrDepartment"
              value={
                departmentDM.valueOf(formik.values.stateOrDepartment)?.value ||
                formik.values.stateOrDepartment
              }
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.stateOrDepartment}
              isDisabled={
                formik.values.stateOrDepartment ||
                !formik.values.country ||
                loading
              }
              size="compact"
              isFullWidth
              state={getFieldState(formik, "stateOrDepartment")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El estado / departamento es válido"
              isRequired={isRequired("stateOrDepartment")}
              suggestions={departmentDM.options}
              autocompleteChars={2}
              autocomplete
            />

            <TextField
              label="Ciudad"
              placeholder="Ciudad"
              name="city"
              id="city"
              value={
                cityDM.valueOf(formik.values.city)?.value || formik.values.city
              }
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.city}
              isDisabled={
                formik.values.city ||
                !formik.values.country ||
                !formik.values.stateOrDepartment ||
                loading
              }
              size="compact"
              isFullWidth
              state={getFieldState(formik, "city")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="La ciudad es válida"
              isRequired={isRequired("city")}
              suggestions={cityDM.options}
              autocompleteChars={2}
              autocomplete
            />

            <TextField
              label="Dirección"
              placeholder="Dirección"
              name="address"
              id="address"
              value={formik.values.address}
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.address}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "address")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="La dirección es válida"
              isRequired={isRequired("address")}
            />

            <TextField
              label="Código postal"
              placeholder="Código postal"
              name="zipCode"
              id="zipCode"
              type="number"
              value={formik.values.zipCode}
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.zipCode}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "zipCode")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El código postal es válido"
              isRequired={isRequired("zipCode")}
            />
          </Grid>
        </Fieldset>
        <Fieldset title="Teléfono" size={isMobile ? "small" : "medium"}>
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
          >
            <TextField
              label="Teléfono"
              placeholder="Teléfono"
              name="landlinePhone"
              id="landlinePhone"
              type="number"
              value={formik.values.landlinePhone}
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.landlinePhone}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "landlinePhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El teléfono es válido"
              isRequired={isRequired("landlinePhone")}
            />

            <TextField
              label="Celular"
              placeholder="Celular"
              name="cellPhone"
              id="cellPhone"
              type="number"
              value={formik.values.cellPhone}
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.cellPhone}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "cellPhone")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El celular es válido"
              isRequired={isRequired("cellPhone")}
            />
          </Grid>
        </Fieldset>
        <Fieldset
          title="Correo electrónico"
          size={isMobile ? "small" : "medium"}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={
              isMobile
                ? inube.spacing.s150
                : isTablet
                  ? inube.spacing.s200
                  : inube.spacing.s300
            }
          >
            <TextField
              label="Correo electronico"
              placeholder="Correo electronico"
              name="email"
              id="email"
              value={formik.values.email}
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.email}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "email")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="El correo electronico es válido"
              isRequired={isRequired("email")}
            />
          </Grid>
        </Fieldset>

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

export { ContactDataFormUI };
