import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";

interface PersonalInformationFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function PersonalInformationFormUI(props: PersonalInformationFormUIProps) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const mquery = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Grid
        templateColumns={mquery ? "1fr" : "1fr 1fr"}
        gap={mquery ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`}
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

        <Select
          label="Lugar de expedición"
          name="expeditionPlace"
          id="expeditionPlace"
          value={formik.values.expeditionPlace}
          size="compact"
          isFullWidth
          options={cityDM.options}
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.expeditionPlace}
          isDisabled={loading}
          state={stateValue("expeditionPlace")}
          handleChange={formik.handleChange}
          validMessage="El lugar de expedición es válido"
        />

        <TextField
          label="Fecha de expedición"
          placeholder="Ejemplo: 01/Ene/1990"
          name="expeditionDate"
          id="expeditionDate"
          value={formik.values.expeditionDate}
          type="text"
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.expeditionDate}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("expeditionDate")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="La fecha de expedición es válida"
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
          state={stateValue("birthDate")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="La fecha de nacimiento es válida"
        />

        <Select
          label="Ciudad de nacimiento"
          name="city"
          id="city"
          value={formik.values.city}
          size="compact"
          isFullWidth
          options={cityDM.options}
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.city}
          isDisabled={loading}
          state={stateValue("city")}
          handleChange={formik.handleChange}
          validMessage="La ciudad de nacimiento es válida"
        />

        <Select
          label="Género"
          name="gender"
          id="gender"
          value={formik.values.gender}
          size="compact"
          isFullWidth
          options={genderDM.options}
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.gender}
          isDisabled={loading}
          state={stateValue("gender")}
          handleChange={formik.handleChange}
          validMessage="El género es válido"
        />

        <Select
          label="Estado civil"
          name="maritalStatus"
          id="maritalStatus"
          value={formik.values.maritalStatus}
          size="compact"
          isFullWidth
          options={maritalStatusDM.options}
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.maritalStatus}
          isDisabled={loading}
          state={stateValue("maritalStatus")}
          handleChange={formik.handleChange}
          validMessage="El estado civil es válido"
        />

        <Select
          label="Factor RH"
          name="bloodType"
          id="bloodType"
          value={formik.values.bloodType}
          size="compact"
          isFullWidth
          options={bloodTypeDM.options}
          handleBlur={formik.handleBlur}
          errorMessage={formik.errors.bloodType}
          isDisabled={loading}
          state={stateValue("bloodType")}
          handleChange={formik.handleChange}
          validMessage="El factor RH es válido"
        />
      </Grid>
    </form>
  );
}

export { PersonalInformationFormUI };
