import { Button } from "@design/input/Button";
import { DateField } from "@design/input/DateField";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Stack } from "@inubekit/stack";
import { FormikValues } from "formik";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { residenceTypeDM } from "src/model/domains/general/updateData/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/general/updateData/personalResidence/stratumdm";
import { getFieldState } from "src/utils/forms/forms";

interface PersonalResidenceFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  withSubmit?: boolean;
}

function PersonalResidenceFormUI(props: PersonalResidenceFormUIProps) {
  const { formik, loading, withSubmit } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s300}>
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
            onBlur={formik.handleBlur}
            isDisabled={loading}
            state={getFieldState(formik, "type")}
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
            onBlur={formik.handleBlur}
            isDisabled={loading}
            state={getFieldState(formik, "stratum")}
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
                state={getFieldState(formik, "bankEntity")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                validMessage="La entidad bancaria es válida"
              />
              <DateField
                label="Fecha de vencimiento"
                name="dueDate"
                id="dueDate"
                value={formik.values.dueDate}
                errorMessage={formik.errors.dueDate}
                isDisabled={loading}
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "dueDate")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                validMessage="La fecha de vencimiento es válida"
                isFullWidth
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
                state={getFieldState(formik, "tenant")}
                onBlur={formik.handleBlur}
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
                state={getFieldState(formik, "tenantCellPhone")}
                onBlur={formik.handleBlur}
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
                state={getFieldState(formik, "ownerName")}
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
                isDisabled={loading}
                state={getFieldState(formik, "relationship")}
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
                state={getFieldState(formik, "ownerCellPhone")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                validMessage="El celular del titular es válido"
              />
            </>
          )}
        </Grid>
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

export { PersonalResidenceFormUI };
