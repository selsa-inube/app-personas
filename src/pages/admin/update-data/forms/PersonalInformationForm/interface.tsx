import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { bloodTypeDM } from "src/model/domains/personalInformation/bloodtypedm";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { maritalStatusDM } from "src/model/domains/personalInformation/maritalstatusdm";

interface PersonalInformationFormUIProps {
  formik: FormikValues;
  loading: boolean;
}

function PersonalInformationFormUI(props: PersonalInformationFormUIProps) {
  const { formik, loading } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  return (
    <Grid
      templateColumns="1fr 1fr"
      gap={`${inube.spacing.s200} ${inube.spacing.s300}`}
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
        isDisabled
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
        isDisabled
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
        isDisabled
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
        isDisabled
      />

      <Select
        label="Tipo de identificación"
        name="identificationType"
        id="identificationType"
        value={formik.values.identificationType}
        size="compact"
        isFullWidth
        readOnly
        isDisabled
      />

      <TextField
        label="Numero de identificación"
        placeholder="Numero de identificación"
        name="identification"
        id="identification"
        value={formik.values.identification}
        type="number"
        isDisabled
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
      />

      <TextField
        label="Fecha de expedición"
        placeholder="Fecha de expedición"
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
      />

      <TextField
        label="Fecha de nacimiento"
        placeholder="Fecha de nacimiento"
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
      />

      <Select
        label="Genero"
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
      />
    </Grid>
  );
}

export { PersonalInformationFormUI };
