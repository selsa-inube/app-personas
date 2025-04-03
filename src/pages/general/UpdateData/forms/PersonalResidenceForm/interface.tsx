import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Date, Grid, Select, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { residenceTypeDM } from "src/model/domains/general/updateData/personalResidence/residencetypedm";
import { stratumDM } from "src/model/domains/general/updateData/personalResidence/stratumdm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
} from "src/utils/forms/forms";
import { IPersonalResidenceEntry } from "./types";

interface PersonalResidenceFormUIProps {
  formik: FormikProps<IPersonalResidenceEntry>;
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
          templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
          autoRows="auto"
          gap={isMobile ? inube.spacing.s200 : inube.spacing.s300}
        >
          <Select
            label="Tipo de vivienda"
            name="type"
            id="type"
            value={formik.values.type}
            fullwidth
            size={isMobile ? "compact" : "wide"}
            options={residenceTypeDM.options}
            onBlur={formik.handleBlur}
            disabled={loading}
            invalid={isInvalid(formik, "type")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
          />
          <Select
            label="Estrato de la vivienda"
            name="stratum"
            id="stratum"
            value={formik.values.stratum}
            fullwidth
            size={isMobile ? "compact" : "wide"}
            options={stratumDM.options}
            onBlur={formik.handleBlur}
            disabled={loading}
            invalid={isInvalid(formik, "stratum")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
          />
          {formik.values.type === residenceTypeDM.OWN_WITH_MORTGAGE.id && (
            <>
              <TextField
                label="Entidad bancaria"
                placeholder="Entidad bancaria"
                name="bankEntity"
                id="bankEntity"
                value={formik.values.bankEntity}
                message={formik.errors.bankEntity}
                disabled={loading}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "bankEntity")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Date
                label="Fecha de vencimiento"
                name="dueDate"
                id="dueDate"
                value={formik.values.dueDate}
                message={formik.errors.dueDate}
                disabled={loading}
                size={isMobile ? "compact" : "wide"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullwidth
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
                message={formik.errors.tenant}
                disabled={loading}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "tenant")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                label="Celular del arrendador"
                placeholder="Celular del arrendador"
                name="tenantCellPhone"
                id="tenantCellPhone"
                value={formik.values.tenantCellPhone}
                message={formik.errors.tenantCellPhone}
                disabled={loading}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "tenantCellPhone")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                message={formik.errors.ownerName}
                disabled={loading}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "ownerName")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Select
                label="Parentesco"
                name="relationship"
                id="relationship"
                value={formik.values.relationship}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                options={relationshipDM.options}
                onBlur={formik.handleBlur}
                disabled={loading}
                invalid={isInvalid(formik, "relationship")}
                onChange={(name, value) =>
                  formikHandleChange(name, value, formik)
                }
              />
              <TextField
                label="Celular del titular"
                placeholder="Celular del titular"
                name="ownerCellPhone"
                id="ownerCellPhone"
                value={formik.values.ownerCellPhone}
                message={formik.errors.ownerCellPhone}
                disabled={loading}
                fullwidth
                size={isMobile ? "compact" : "wide"}
                state={getFieldState(formik, "ownerCellPhone")}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </>
          )}
        </Grid>
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

export { PersonalResidenceFormUI };
