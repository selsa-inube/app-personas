import { DateField } from "@design/input/DateField";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Fieldset, Grid, Select, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { IServiceDomains } from "src/context/app/types";
import { cityDM } from "src/model/domains/general/updateData/personalInformation/citydm";
import { departmentDM } from "src/model/domains/general/updateData/personalInformation/departamentdm";
import {
  formikHandleChange,
  getFieldState,
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

  const isTablet = useMediaQuery("(max-width: 850px)");
  const isMobile = useMediaQuery("(max-width: 610px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
        <Fieldset
          legend="Nombres"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
            width="100%"
          >
            <TextField
              label="Primer nombre"
              placeholder="Primer nombre"
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              size="compact"
              fullwidth
              disabled
            />

            <TextField
              label="Segundo nombre"
              placeholder="Segundo nombre"
              name="secondName"
              id="secondName"
              value={formik.values.secondName}
              size="compact"
              fullwidth
              disabled
            />

            <TextField
              label="Primer apellido"
              placeholder="Primer apellido"
              name="firstLastName"
              id="firstLastName"
              value={formik.values.firstLastName}
              size="compact"
              fullwidth
              disabled
            />

            <TextField
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

        <Fieldset
          legend="Identificación"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
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

            <TextField
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

            <Select
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

            <Select
              label="Estado de expedición"
              name="expeditionDepartment"
              id="expeditionDepartment"
              value={formik.values.expeditionDepartment}
              size="compact"
              fullwidth
              options={departmentDM.options}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled
              invalid={isInvalid(formik, "expeditionDepartment")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <Select
              label="Ciudad de expedición"
              name="expeditionCity"
              id="expeditionCity"
              value={formik.values.expeditionCity}
              size="compact"
              fullwidth
              options={cityDM.options}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled
              invalid={isInvalid(formik, "expeditionCity")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <DateField
              label="Fecha de expedición"
              name="expeditionDate"
              id="expeditionDate"
              value={formik.values.expeditionDate}
              fullwidth
              disabled
            />
          </Grid>
        </Fieldset>

        <Fieldset
          legend="Complementarios"
          type={isTablet ? "label" : "title"}
          size={isTablet ? "medium" : "small"}
        >
          <Grid
            templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
            autoRows="auto"
            gap={isMobile ? inube.spacing.s150 : inube.spacing.s300}
            width="100%"
          >
            <Select
              label="País de nacimiento"
              name="country"
              id="country"
              value={formik.values.country}
              size="compact"
              fullwidth
              options={serviceDomains.countries}
              onBlur={formik.handleBlur}
              message={formik.errors.country}
              disabled={loading}
              invalid={isInvalid(formik, "country")}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
            />

            <DateField
              label="Fecha de nacimiento"
              name="birthDate"
              id="birthDate"
              value={formik.values.birthDate}
              message={formik.errors.birthDate}
              disabled={loading}
              state={getFieldState(formik, "birthDate")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
