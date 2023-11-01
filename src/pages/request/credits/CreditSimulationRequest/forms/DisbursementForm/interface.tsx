import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IFormField } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import { getFieldState } from "src/utils/forms";
import { StyledInputForm } from "src/utils/forms.styles";

interface DisbursementFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  customHandleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  renderFields: IFormField[];
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const {
    formik,
    loading,
    customHandleBlur,
    customHandleChange,
    renderFields,
  } = props;

  const isTablet = useMediaQuery("(max-width: 900px)");

  const disbursementTypeDM = getDomainById("disbursementType");

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Select
          name="disbursementType"
          id="disbursementType"
          label="Forma de desembolso"
          value={formik.values.disbursementType}
          size="compact"
          isDisabled={loading}
          options={disbursementTypeDM}
          handleChange={customHandleChange}
          handleBlur={customHandleBlur}
          state={getFieldState(formik, "disbursementType")}
          errorMessage={formik.errors.disbursementType}
          isFullWidth
        />
        <Grid templateColumns="repeat(2, 1fr)" gap="s300">
          {renderFields.map((field) => {
            switch (field.type) {
              case "select":
                return (
                  <StyledInputForm
                    gridColumn={isTablet ? "span 2" : field.gridColumn}
                    key={field.name}
                  >
                    <Select
                      name={field.name}
                      id={field.name}
                      label={field.label}
                      value={field.value || formik.values[field.name]}
                      size={field.size}
                      options={field.options}
                      handleChange={customHandleChange}
                      handleBlur={customHandleBlur}
                      state={getFieldState(formik, field.name)}
                      errorMessage={formik.errors[field.name]}
                      isFullWidth={field.isFullWidth}
                      readOnly={field.readOnly}
                      isDisabled={loading}
                    />
                  </StyledInputForm>
                );
              case "text":
                return (
                  <StyledInputForm
                    gridColumn={isTablet ? "span 2" : field.gridColumn}
                    key={field.name}
                  >
                    <TextField
                      name={field.name}
                      id={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      size={field.size}
                      type="text"
                      value={field.value || formik.values[field.name]}
                      handleBlur={customHandleBlur}
                      state={getFieldState(formik, field.name)}
                      handleChange={formik.handleChange}
                      validMessage={field.validMessage}
                      errorMessage={formik.errors[field.name]}
                      isFullWidth={field.isFullWidth}
                      readOnly={field.readOnly}
                      isDisabled={loading}
                    />
                  </StyledInputForm>
                );
              case "textarea":
                return (
                  <StyledInputForm
                    gridColumn={isTablet ? "span 2" : field.gridColumn}
                    key={field.name}
                  >
                    <Textarea
                      name={field.name}
                      id={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={field.value || formik.values[field.name]}
                      handleBlur={customHandleBlur}
                      handleChange={formik.handleChange}
                      state={getFieldState(formik, field.name)}
                      validMessage={field.validMessage}
                      errorMessage={formik.errors[field.name]}
                      isFullWidth={field.isFullWidth}
                      readOnly={field.readOnly}
                      maxLength={field.maxLength}
                      isDisabled={loading}
                    />
                  </StyledInputForm>
                );
            }
          })}
        </Grid>
      </Stack>
    </form>
  );
}

export { DisbursementFormUI };
