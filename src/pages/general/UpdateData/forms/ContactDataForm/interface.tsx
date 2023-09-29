import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";

interface ContactDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
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
        templateColumns={mquery ? "1fr" : "1fr 1fr 1fr"}
        gap={mquery ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`}
      >
        <TextField
          label="País"
          placeholder="País"
          name="country"
          id="country"
          value={formik.values.country}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.country}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("country")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El país es válido"
        />

        <TextField
          label="Estado / Departamento"
          placeholder="Estado o Departamento"
          name="stateOrDepartment"
          id="stateOrDepartment"
          value={formik.values.stateOrDepartment}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.stateOrDepartment}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("stateOrDepartment")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El estado / departamento es válido"
        />

        <TextField
          label="Ciudad"
          placeholder="Ciudad"
          name="city"
          id="city"
          value={formik.values.city}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.city}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("city")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="La ciudad es válida"
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
          state={stateValue("address")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="La dirección es válida"
        />

        <TextField
          label="Código postal"
          placeholder="Código postal"
          name="postalCode"
          id="postalCode"
          value={formik.values.postalCode}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.postalCode}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("postalCode")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El código postal es válido"
        />

        <TextField
          label="Teléfono"
          placeholder="Teléfono"
          name="landlinePhone"
          id="landlinePhone"
          value={formik.values.landlinePhone}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.landlinePhone}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("landlinePhone")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El teléfono es válido"
        />

        <TextField
          label="Celular"
          placeholder="Celular"
          name="cellPhone"
          id="cellPhone"
          value={formik.values.cellPhone}
          iconAfter={<MdOutlineModeEdit size={18} />}
          errorMessage={formik.errors.cellPhone}
          isDisabled={loading}
          size="compact"
          isFullWidth
          state={stateValue("cellPhone")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El celular es válido"
        />

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
          state={stateValue("email")}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          validMessage="El correo electronico es válido"
        />
      </Grid>
    </form>
  );
}

export { ContactDataFormUI };
