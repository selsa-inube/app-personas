import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { countryDM } from "src/model/domains/financialOperations/countrydm";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";
import { getFieldState } from "src/utils/forms/forms";

interface PersonalInformationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function PersonalInformationFormUI(props: PersonalInformationFormUIProps) {
  const { formik, loading } = props;

  const isMobile = useMediaQuery("(max-width: 610px)");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Fieldset
          title="Nombres"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={isMobile ? "1fr" : "1fr 1fr 1fr"}
            gap={isMobile ? "s150" : "s300"}
          >
            <TextField
              label="Primer nombre"
              placeholder="Primer nombre"
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Segundo nombre"
              placeholder="Segundo nombre"
              name="secondName"
              id="secondName"
              value={formik.values.secondName}
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Primer apellido"
              placeholder="Primer apellido"
              name="firstLastName"
              id="firstLastName"
              value={formik.values.firstLastName}
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Segundo apellido"
              placeholder="Segundo apellido"
              name="secondLastName"
              id="secondLastName"
              value={formik.values.secondLastName}
              size="compact"
              isFullWidth
              readOnly
            />
          </Grid>
        </Fieldset>

        <Fieldset
          title="Identificación"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={isMobile ? "1fr" : "1fr 1fr 1fr"}
            gap={isMobile ? "s150" : "s300"}
          >
            <Select
              label="Tipo de identificación"
              name="identificationType"
              id="identificationType"
              value={formik.values.identificationType}
              size="compact"
              isFullWidth
              readOnly
              options={identificationTypeDM.options}
            />

            <TextField
              label="Numero de identificación"
              placeholder="Numero de identificación"
              name="identification"
              id="identification"
              value={formik.values.identification}
              type="number"
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Pais de expedición"
              placeholder="Pais de expedición"
              name="expeditionCountry"
              id="expeditionCountry"
              value={formik.values.expeditionCountry}
              type="text"
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Estado / Departamento de expedición"
              placeholder="Estado / Departamento de expedición"
              name="expeditionDepartment"
              id="expeditionDepartment"
              value={formik.values.expeditionDepartment}
              type="text"
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Ciudad de expedición"
              placeholder="Ciudad de expedición"
              name="expeditionCity"
              id="expeditionCity"
              value={formik.values.expeditionCity}
              type="text"
              size="compact"
              isFullWidth
              readOnly
            />

            <TextField
              label="Fecha de expedición"
              placeholder="Ejemplo: 01/Ene/1990"
              name="expeditionDate"
              id="expeditionDate"
              value={formik.values.expeditionDate}
              type="text"
              size="compact"
              isFullWidth
              readOnly
            />
          </Grid>
        </Fieldset>
        <Fieldset
          title="Complementarios"
          type={isMobile ? "label" : "title"}
          size={isMobile ? "medium" : "small"}
        >
          <Grid
            templateColumns={isMobile ? "1fr" : "1fr 1fr 1fr"}
            gap={isMobile ? "s150" : "s300"}
          >
            <Select
              label="País de nacimiento"
              name="country"
              id="country"
              value={formik.values.country}
              size="compact"
              isFullWidth
              options={countryDM.options}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.country}
              isDisabled={loading}
              state={getFieldState(formik, "country")}
              onChange={formik.handleChange}
            />

            <TextField
              label="Fecha de nacimiento"
              placeholder="Ejemplo: 01/Ene/1990"
              name="birthDate"
              id="birthDate"
              value={formik.values.birthDate}
              type="text"
              iconAfter={<MdOutlineModeEdit size={18} />}
              errorMessage={formik.errors.birthDate}
              isDisabled={loading}
              size="compact"
              isFullWidth
              state={getFieldState(formik, "birthDate")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              validMessage="La fecha de nacimiento es válida"
              isRequired
            />

            <Select
              label="Estado civil"
              name="maritalStatus"
              id="maritalStatus"
              value={formik.values.maritalStatus}
              size="compact"
              isFullWidth
              options={maritalStatusDM.options}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.maritalStatus}
              isDisabled={loading}
              state={getFieldState(formik, "maritalStatus")}
              onChange={formik.handleChange}
            />

            <Select
              label="Género"
              name="gender"
              id="gender"
              value={formik.values.gender}
              size="compact"
              isFullWidth
              options={genderDM.options}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.gender}
              isDisabled={loading}
              state={getFieldState(formik, "gender")}
              onChange={formik.handleChange}
            />

            <Select
              label="Factor RH"
              name="bloodType"
              id="bloodType"
              value={formik.values.bloodType}
              size="compact"
              isFullWidth
              options={bloodTypeDM.options}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.bloodType}
              isDisabled={loading}
              state={getFieldState(formik, "bloodType")}
              onChange={formik.handleChange}
            />
          </Grid>
        </Fieldset>
      </Stack>
    </form>
  );
}

export { PersonalInformationFormUI };
