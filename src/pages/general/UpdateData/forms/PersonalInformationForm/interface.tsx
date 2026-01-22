import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Autocomplete,
  Button,
  Date,
  Fieldset,
  Grid,
  Numberfield,
  Select,
  Stack,
  Textfield,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IServiceDomains } from "src/context/app/types";
import {
  formikHandleChange,
  getFieldStatus,
  isInvalid,
} from "src/utils/forms/forms";
import { IPersonalInformationEntry } from "./types";

interface PersonalInformationFormUIProps {
  formik: FormikProps<IPersonalInformationEntry>;
  loading?: boolean;
  withSubmit?: boolean;
  serviceDomains: IServiceDomains;
}

function PersonalInformationFormUI(props: PersonalInformationFormUIProps) {
  const { formik, loading, withSubmit, serviceDomains } = props;

  const isMobile = useMediaQuery("(max-width: 610px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Fieldset legend="Nombres">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
            width="100%"
          >
            <Textfield
              label="Primer nombre"
              placeholder="Primer nombre"
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              size="compact"
              fullwidth
              disabled
            />

            <Textfield
              label="Segundo nombre"
              placeholder="Segundo nombre"
              name="secondName"
              id="secondName"
              value={formik.values.secondName}
              size="compact"
              fullwidth
              disabled
            />

            <Textfield
              label="Primer apellido"
              placeholder="Primer apellido"
              name="firstLastName"
              id="firstLastName"
              value={formik.values.firstLastName}
              size="compact"
              fullwidth
              disabled
            />

            <Textfield
              label="Segundo apellido"
              placeholder="Segundo apellido"
              name="secondLastName"
              id="secondLastName"
              value={formik.values.secondLastName}
              size="compact"
              fullwidth
              disabled
            />
          </Grid>
        </Fieldset>

        <Fieldset legend="Identificación">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
            width="100%"
          >
            <Select
              label="Tipo de identificación"
              name="identificationType"
              id="identificationType"
              value={formik.values.identificationType.id}
              size="compact"
              fullwidth
              disabled
              options={serviceDomains.identificationtype}
              onChange={() => true}
            />

            <Numberfield
              label="Numero de identificación"
              placeholder="Numero de identificación"
              name="identification"
              id="identification"
              value={formik.values.identification}
              type="number"
              size="compact"
              fullwidth
              disabled
            />

            <Autocomplete
              label="Pais de expedición"
              name="expeditionCountry"
              id="expeditionCountry"
              value={formik.values.expeditionCountry}
              size="compact"
              fullwidth
              options={serviceDomains.countries}
              onBlur={formik.handleBlur}
              message={formik.errors.expeditionCountry}
              invalid={isInvalid(formik, "expeditionCountry")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
              disabled
            />

            <Autocomplete
              label="Estado de expedición"
              name="expeditionDepartment"
              id="expeditionDepartment"
              value={formik.values.expeditionDepartment}
              size="compact"
              fullwidth
              options={serviceDomains.departments}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled
              invalid={isInvalid(formik, "expeditionDepartment")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Autocomplete
              label="Ciudad de expedición"
              name="expeditionCity"
              id="expeditionCity"
              value={formik.values.expeditionCity}
              size="compact"
              fullwidth
              options={serviceDomains.cities}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled
              invalid={isInvalid(formik, "expeditionCity")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Date
              label="Fecha de expedición"
              name="expeditionDate"
              id="expeditionDate"
              size="compact"
              value={formik.values.expeditionDate}
              fullwidth
              disabled
            />
          </Grid>
        </Fieldset>

        <Fieldset legend="Complementarios">
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
            width="100%"
          >
            <Autocomplete
              label="País de nacimiento"
              name="country"
              id="country"
              value={formik.values.country}
              size="compact"
              fullwidth
              options={serviceDomains.countries}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled
              invalid={isInvalid(formik, "country")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Date
              label="Fecha de nacimiento"
              name="birthDate"
              id="birthDate"
              size="compact"
              value={formik.values.birthDate}
              message={formik.errors.birthDate}
              disabled={loading}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              status={getFieldStatus(formik, "birthDate")}
              fullwidth
            />

            <Select
              label="Estado civil"
              name="civilStatus"
              id="civilStatus"
              value={formik.values.civilStatus}
              size="compact"
              fullwidth
              options={serviceDomains.civilstatus}
              onBlur={formik.handleBlur}
              message={formik.errors.civilStatus}
              disabled={loading}
              invalid={isInvalid(formik, "civilStatus")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Select
              label="Género"
              name="gender"
              id="gender"
              value={formik.values.gender}
              size="compact"
              fullwidth
              options={serviceDomains.gender}
              onBlur={formik.handleBlur}
              message={formik.errors.gender}
              disabled={loading}
              invalid={isInvalid(formik, "gender")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Select
              label="Factor RH"
              name="rhFactor"
              id="rhFactor"
              value={formik.values.rhFactor}
              size="compact"
              fullwidth
              options={serviceDomains.rhfactor}
              onBlur={formik.handleBlur}
              message={formik.errors.rhFactor}
              disabled={loading}
              invalid={isInvalid(formik, "rhFactor")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />
          </Grid>
        </Fieldset>

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

export { PersonalInformationFormUI };
