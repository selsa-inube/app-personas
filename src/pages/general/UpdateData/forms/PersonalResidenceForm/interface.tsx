import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { FormikValues } from "formik";
import { relationshipDM } from "src/model/domains/personalResidence/relationshipdm";
import { residenceTypeDM } from "src/model/domains/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/personalResidence/stratumdm";

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

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Grid
        templateColumns={isMobile ? "1fr" : "1fr 1fr "}
        gap={isMobile ? "s200" : "s300"}
      >
        <Select
          label="Tipo de vivienda"
          name="type"
          id="type"
          value={formik.values.type}
          isFullWidth
          size={isMobile ? "compact" : "wide"}
          options={residenceTypeDM.options}
          onBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("type")}
          onChange={formik.handleChange}
        />
        <Select
          label="Estrato de la vivienda"
          name="stratum"
          id="stratum"
          value={formik.values.stratum}
          isFullWidth
          size={isMobile ? "compact" : "wide"}
          options={stratumDM.options}
          onBlur={customHandleBlur}
          isDisabled={loading}
          state={stateValue("stratum")}
          onChange={formik.handleChange}
        />
        {formik.values.type === residenceTypeDM.OWN_WITH_MORTGAGE.id && (
          <>
            <TextField
              label="Entidad bancaria"
              placeholder="Entidad bancaria"
              name="bankEntity"
              id="bankEntity"
              value={formik.values.bankEntity}
              errorMessage={formik.errors.bankEntity}
              isDisabled={loading}
              isFullWidth
              size={isMobile ? "compact" : "wide"}
              state={stateValue("bankEntity")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
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
              size={isMobile ? "compact" : "wide"}
              state={stateValue("dueDate")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
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
              size={isMobile ? "compact" : "wide"}
              state={stateValue("tenant")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
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
              size={isMobile ? "compact" : "wide"}
              state={stateValue("tenantCellPhone")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
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
              size={isMobile ? "compact" : "wide"}
              state={stateValue("ownerName")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
              validMessage="El nombre del titular es válido"
            />
            <Select
              label="Parentesco"
              name="relationship"
              id="relationship"
              value={formik.values.relationship}
              isFullWidth
              size={isMobile ? "compact" : "wide"}
              options={relationshipDM.options}
              onBlur={customHandleBlur}
              isDisabled={loading}
              state={stateValue("relationship")}
              onChange={formik.handleChange}
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
              size={isMobile ? "compact" : "wide"}
              state={stateValue("ownerCellPhone")}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
              validMessage="El celular del titular es válido"
            />
          </>
        )}
      </Grid>
    </form>
  );
}

export { PersonalResidenceFormUI };
