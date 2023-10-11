import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { residenceTypeDM } from "src/model/domains/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/personalResidence/stratumdm";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";

interface PersonalResidenceFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
}

function PersonalResidenceFormUI(props: PersonalResidenceFormUIProps) {
  const { formik, loading, customHandleBlur } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const mquery = useMediaQuery("(max-width: 750px)");

  return (
    <form>
      <Grid
        templateColumns={mquery ? "1fr" : "1fr 1fr "}
        gap={mquery ? "s200" : "s300"}
      >
        <Select
          label="Tipo de vivienda"
          name="type"
          id="type"
          value={formik.values.type}
          isFullWidth
          size={mquery ? "compact" : "wide"}
          options={residenceTypeDM.options}
          handleBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("type")}
          handleChange={formik.handleChange}
        />
        <Select
          label="Estrato de la vivienda"
          name="stratum"
          id="stratum"
          value={formik.values.stratum}
          isFullWidth
          size={mquery ? "compact" : "wide"}
          options={stratumDM.options}
          handleBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("stratum")}
          handleChange={formik.handleChange}
        />
        {formik.values.type === residenceTypeDM.OWN_WITH_MORTGAGE.id && (
          <>
            <TextField
              label="Entidad bancaria"
              placeholder="Entidad bancaria"
              name="bankingEntity"
              id="bankingEntity"
              value={formik.values.bankingEntity}
              errorMessage={formik.errors.bankingEntity}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("bankingEntity")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="La entidad bancaria es válida"
            />
            <TextField
              label="Fecha de vencimiento"
              placeholder="Ejemplo: 01/Ene/1990"
              name="dueDate"
              id="dueDate"
              value={formik.values.dueDate}
              errorMessage={formik.errors.dueDate}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("dueDate")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="La fecha de vencimiento es válida"
            />
          </>
        )}
        {formik.values.type === residenceTypeDM.RENT.id && (
          <>
            <TextField
              label="Nombre del arrendador"
              placeholder="Nombre del arrendador"
              name="tenant"
              id="tenant"
              value={formik.values.tenant}
              errorMessage={formik.errors.tenant}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("tenant")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="El nombre del arrendador es válido"
            />
            <TextField
              label="Celular del arrendador"
              placeholder="Celular del arrendador"
              name="tenantCellPhone"
              id="tenantCellPhone"
              value={formik.values.tenantCellPhone}
              errorMessage={formik.errors.tenantCellPhone}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("tenantCellPhone")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="El celular del arrendador es válido"
            />
          </>
        )}
        {formik.values.type === residenceTypeDM.FAMILIAR.id && (
          <>
            <TextField
              label="Nombre del titular"
              placeholder="Nombre del titular"
              name="ownerName"
              id="ownerName"
              value={formik.values.ownerName}
              errorMessage={formik.errors.ownerName}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("ownerName")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="El nombre del titular es válido"
            />
            <Select
              label="Parentesco"
              name="relationship"
              id="relationship"
              value={formik.values.relationship}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              options={relationshipDM.options}
              handleBlur={customHandleBlur}
              isDisabled={loading}
              state={stateValue("relationship")}
              handleChange={formik.handleChange}
            />
            <TextField
              label="Celular del titular"
              placeholder="Celular del titular"
              name="ownerCellPhone"
              id="ownerCellPhone"
              value={formik.values.ownerCellPhone}
              errorMessage={formik.errors.ownerCellPhone}
              isDisabled={loading}
              isFullWidth
              size={mquery ? "compact" : "wide"}
              state={stateValue("ownerCellPhone")}
              handleBlur={customHandleBlur}
              handleChange={formik.handleChange}
              validMessage="El celular del titular es válido"
            />
          </>
        )}
      </Grid>
    </form>
  );
}

export { PersonalResidenceFormUI };
