import { Fieldset } from "@design/input/Fieldset";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { cityDM } from "src/model/domains/personalInformation/citydm";

interface ContactDataFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function ContactDataFormUI(props: ContactDataFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <form>
      <Fieldset title={`Dirección N° ${formik.values.id}`}>
        <Grid
          templateColumns={
            isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
          }
          gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("country")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("stateOrDepartment")}
            handleBlur={customHandleBlur}
            handleChange={formik.handleChange}
            validMessage="El estado / departamento es válido"
          />

          <TextField
            label="Ciudad"
            placeholder="Ciudad"
            name="city"
            id="city"
            value={cityDM.valueOf(formik.values.city)?.value}
            iconAfter={<MdOutlineModeEdit size={18} />}
            errorMessage={formik.errors.city}
            isDisabled={loading}
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("city")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("address")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("postalCode")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("landlinePhone")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("cellPhone")}
            handleBlur={customHandleBlur}
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
            size={isMobile ? "compact" : "wide"}
            isFullWidth
            state={stateValue("email")}
            handleBlur={customHandleBlur}
            handleChange={formik.handleChange}
            validMessage="El correo electronico es válido"
          />
        </Grid>
      </Fieldset>
    </form>
  );
}

export { ContactDataFormUI };
