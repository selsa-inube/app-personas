import { EconomicActivityModal } from "@components/modals/general/updateData/EconomicActivityModal";
import { DateField } from "@design/input/DateField";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Fieldset, Grid, Select, Stack } from "@inubekit/inubekit";
import { companiesData } from "@mocks/domains/companies";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import {
  IEconomicActivity,
  economicActivitiesMock,
} from "@mocks/users/economicActivities.mocks";
import { FormikProps } from "formik";
import { MdSearch } from "react-icons/md";
import { companyFormalityDM } from "src/model/domains/general/updateData/economicActivity/companyformalitydm";
import { contractTypeDM } from "src/model/domains/general/updateData/economicActivity/contracttypedm";
import { economicActivityDM } from "src/model/domains/general/updateData/economicActivity/economicactivitydm";
import { severanceRegimeDM } from "src/model/domains/general/updateData/economicActivity/severanceregimedm";
import { workdayDM } from "src/model/domains/general/updateData/economicActivity/workdaydm";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { IEconomicActivityEntry } from "./types";

interface EconomicActivityFormUIProps {
  formik: FormikProps<IEconomicActivityEntry>;
  loading?: boolean;
  showMainActivityModal: boolean;
  showSecondaryActivityModal: boolean;
  withSubmit?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  handleToggleModal: (field: string) => void;
  handleModalSelect: (field: string, selectedItem: IEconomicActivity) => void;
}

function EconomicActivityFormUI(props: EconomicActivityFormUIProps) {
  const {
    formik,
    loading,
    showMainActivityModal,
    showSecondaryActivityModal,
    withSubmit,
    validationSchema,
    handleToggleModal,
    handleModalSelect,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <form>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Fieldset
            legend="Clasificación económica"
            size="medium"
            type={isMobile ? "label" : "title"}
          >
            <Grid
              templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
              autoRows="auto"
              gap={
                isMobile
                  ? inube.spacing.s150
                  : isTablet
                    ? inube.spacing.s200
                    : inube.spacing.s300
              }
              width="100%"
            >
              <Select
                label="Actividad económica"
                name="economicActivity"
                id="economicActivity"
                value={formik.values.economicActivity}
                size="compact"
                options={economicActivityDM.options}
                invalid={isInvalid(formik, "economicActivity")}
                required={isRequired(validationSchema, "economicActivity")}
                message={formik.errors.economicActivity}
                onBlur={formik.handleBlur}
                onChange={(name, value) =>
                  formikHandleChange(name, value, formik)
                }
                disabled={loading}
                fullwidth
              />
              {formik.values.economicActivity && (
                <>
                  <Select
                    label="Profesión"
                    name="profession"
                    id="profession"
                    value={formik.values.profession}
                    size="compact"
                    options={getDomainById("profession")}
                    invalid={isInvalid(formik, "profession")}
                    required={isRequired(validationSchema, "profession")}
                    message={formik.errors.profession}
                    onBlur={formik.handleBlur}
                    onChange={(name, value) =>
                      formikHandleChange(name, value, formik)
                    }
                    disabled={loading}
                    fullwidth
                  />
                  <TextField
                    label="Oficio"
                    placeholder="Oficio"
                    name="job"
                    id="job"
                    value={formik.values.job}
                    message={formik.errors.job}
                    disabled={loading}
                    size="compact"
                    fullwidth
                    state={getFieldState(formik, "job")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required={isRequired(validationSchema, "job")}
                  />
                  <TextField
                    label="Actividad CIIU principal"
                    placeholder="Buscar actividad"
                    name="mainCiiuActivity"
                    id="mainCiiuActivity"
                    value={formik.values.mainCiiuActivity}
                    message={formik.errors.mainCiiuActivity}
                    disabled={loading}
                    iconAfter={<MdSearch size={18} cursor={"pointer"} />}
                    size="compact"
                    fullwidth
                    state={getFieldState(formik, "mainCiiuActivity")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required={isRequired(validationSchema, "mainCiiuActivity")}
                    onIconClick={() => handleToggleModal("mainCiiuActivity")}
                  />
                  <TextField
                    label="Actividad CIIU secundaria"
                    placeholder="Buscar actividad"
                    name="secondaryCiiuActivity"
                    id="secondaryCiiuActivity"
                    value={formik.values.secondaryCiiuActivity}
                    message={formik.errors.secondaryCiiuActivity}
                    disabled={loading}
                    iconAfter={<MdSearch size={18} cursor={"pointer"} />}
                    size="compact"
                    fullwidth
                    state={getFieldState(formik, "secondaryCiiuActivity")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required={isRequired(
                      validationSchema,
                      "secondaryCiiuActivity",
                    )}
                    onIconClick={() =>
                      handleToggleModal("secondaryCiiuActivity")
                    }
                  />
                  <Select
                    label="Sector económico"
                    name="economicSector"
                    id="economicSector"
                    value={formik.values.economicSector}
                    size="compact"
                    options={getDomainById("economicSector")}
                    invalid={isInvalid(formik, "economicSector")}
                    required={isRequired(validationSchema, "economicSector")}
                    message={formik.errors.economicSector}
                    onBlur={formik.handleBlur}
                    onChange={(name, value) =>
                      formikHandleChange(name, value, formik)
                    }
                    disabled={loading}
                    fullwidth
                  />
                </>
              )}
            </Grid>
          </Fieldset>
          {formik.values.economicActivity ===
            economicActivityDM.EMPLOYEE.id && (
            <Fieldset
              legend="Detalles laborales"
              size="medium"
              type={isMobile ? "label" : "title"}
            >
              <Grid
                templateColumns={`repeat(${isMobile ? 1 : isTablet ? 2 : 3}, 1fr)`}
                autoRows="auto"
                gap={
                  isMobile
                    ? inube.spacing.s150
                    : isTablet
                      ? inube.spacing.s200
                      : inube.spacing.s300
                }
                width="100%"
              >
                <TextField
                  label="Empresa"
                  placeholder="Empresa"
                  name="company"
                  id="company"
                  value={formik.values.company}
                  message={formik.errors.company}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  state={getFieldState(formik, "company")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required={isRequired(validationSchema, "company")}
                  suggestions={getDomainById("companies")}
                  autocompleteChars={1}
                  autocomplete
                />
                <Select
                  label="Tipo de contrato"
                  name="contractType"
                  id="contractType"
                  value={formik.values.contractType}
                  size="compact"
                  options={contractTypeDM.options}
                  invalid={isInvalid(formik, "contractType")}
                  required={isRequired(validationSchema, "contractType")}
                  message={formik.errors.contractType}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  disabled={loading}
                  fullwidth
                />
                <DateField
                  label="Fecha de ingreso"
                  name="admissionDate"
                  id="admissionDate"
                  value={formik.values.admissionDate}
                  message={formik.errors.admissionDate}
                  disabled={loading}
                  state={getFieldState(formik, "admissionDate")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required={isRequired(validationSchema, "admissionDate")}
                  fullwidth
                />

                {formik.values.contractType !== contractTypeDM.PERMANENT.id && (
                  <DateField
                    label="Vencimiento del contrato"
                    name="contractExpiration"
                    id="contractExpiration"
                    value={formik.values.contractExpiration}
                    message={formik.errors.contractExpiration}
                    disabled={loading}
                    size="compact"
                    fullwidth
                    state={getFieldState(formik, "contractExpiration")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required={isRequired(
                      validationSchema,
                      "contractExpiration",
                    )}
                  />
                )}

                <Select
                  label="Régimen de cesantías"
                  name="severanceRegime"
                  id="severanceRegime"
                  value={formik.values.severanceRegime}
                  size="compact"
                  options={severanceRegimeDM.options}
                  invalid={isInvalid(formik, "severanceRegime")}
                  required={isRequired(validationSchema, "severanceRegime")}
                  message={formik.errors.severanceRegime}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  disabled={loading}
                  fullwidth
                />
                <Select
                  label="Jornada laboral"
                  name="workday"
                  id="workday"
                  value={formik.values.workday}
                  size="compact"
                  options={workdayDM.options}
                  invalid={isInvalid(formik, "workday")}
                  required={isRequired(validationSchema, "workday")}
                  message={formik.errors.workday}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) =>
                    formikHandleChange(name, value, formik)
                  }
                  disabled={loading}
                  fullwidth
                />
                <TextField
                  label="Cargo"
                  name="position"
                  id="position"
                  placeholder="Digita el cargo"
                  type="text"
                  value={formik.values.position}
                  size="compact"
                  state={getFieldState(formik, "position")}
                  required={isRequired(validationSchema, "position")}
                  message={formik.errors.position}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={loading}
                  fullwidth
                />
                <TextField
                  label="Dependencia"
                  name="dependence"
                  id="dependence"
                  placeholder="Digita la dependencia"
                  type="text"
                  value={formik.values.dependence}
                  size="compact"
                  state={getFieldState(formik, "dependence")}
                  required={isRequired(validationSchema, "dependence")}
                  message={formik.errors.dependence}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  disabled={loading}
                  fullwidth
                />
                <TextField
                  label="Código como empleado"
                  placeholder="Código como empleado"
                  name="employeeCode"
                  id="employeeCode"
                  value={formik.values.employeeCode}
                  message={formik.errors.employeeCode}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  state={getFieldState(formik, "employeeCode")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required={isRequired(validationSchema, "employeeCode")}
                />
                {!formik.values.company ||
                  (!companiesData.some(
                    (companyData) => companyData.id === formik.values.company,
                  ) && (
                    <>
                      <Select
                        label="Formalidad de la empresa"
                        name="companyFormality"
                        id="companyFormality"
                        value={formik.values.companyFormality}
                        size="compact"
                        options={companyFormalityDM.options}
                        invalid={isInvalid(formik, "companyFormality")}
                        required={isRequired(
                          validationSchema,
                          "companyFormality",
                        )}
                        message={formik.errors.companyFormality}
                        onBlur={formik.handleBlur}
                        onChange={(name, value) =>
                          formikHandleChange(name, value, formik)
                        }
                        disabled={loading}
                        fullwidth
                      />
                      <Select
                        label="País de la empresa"
                        name="companyCountry"
                        id="companyCountry"
                        value={formik.values.companyCountry}
                        size="compact"
                        options={countryDM.options}
                        invalid={isInvalid(formik, "companyCountry")}
                        required={isRequired(
                          validationSchema,
                          "companyCountry",
                        )}
                        message={formik.errors.companyCountry}
                        onBlur={formik.handleBlur}
                        onChange={(name, value) =>
                          formikHandleChange(name, value, formik)
                        }
                        disabled={loading}
                        fullwidth
                      />
                      <TextField
                        label="Ciudad de la empresa"
                        placeholder="Ciudad de la empresa"
                        name="companyCity"
                        id="companyCity"
                        value={formik.values.companyCity}
                        message={formik.errors.companyCity}
                        disabled={loading}
                        size="compact"
                        fullwidth
                        state={getFieldState(formik, "companyCity")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required={isRequired(validationSchema, "companyCity")}
                      />
                      <TextField
                        label="Teléfono de la empresa"
                        placeholder="Teléfono de la empresa"
                        name="companyPhone"
                        id="companyPhone"
                        value={formik.values.companyPhone}
                        message={formik.errors.companyPhone}
                        disabled={loading}
                        size="compact"
                        fullwidth
                        state={getFieldState(formik, "companyPhone")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required={isRequired(validationSchema, "companyPhone")}
                      />
                      <TextField
                        label="Dirección de la empresa"
                        placeholder="Dirección de la empresa"
                        name="companyAddress"
                        id="companyAddress"
                        value={formik.values.companyAddress}
                        message={formik.errors.companyAddress}
                        disabled={loading}
                        size="compact"
                        fullwidth
                        state={getFieldState(formik, "companyAddress")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required={isRequired(
                          validationSchema,
                          "companyAddress",
                        )}
                      />
                      <TextField
                        label="Correo electrónico de la empresa"
                        placeholder="Correo electrónico de la empresa"
                        name="companyEmail"
                        id="companyEmail"
                        value={formik.values.companyEmail}
                        message={formik.errors.companyEmail}
                        disabled={loading}
                        size="compact"
                        fullwidth
                        state={getFieldState(formik, "companyEmail")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        required={isRequired(validationSchema, "companyEmail")}
                      />
                    </>
                  ))}
              </Grid>
            </Fieldset>
          )}
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

      {showMainActivityModal && (
        <EconomicActivityModal
          portalId="modals"
          onCloseModal={() => handleToggleModal("mainCiiuActivity")}
          activities={economicActivitiesMock}
          selectedActivityId={formik.values.mainCiiuActivity}
          onSelect={(item) => handleModalSelect("mainCiiuActivity", item)}
        />
      )}
      {showSecondaryActivityModal && (
        <EconomicActivityModal
          portalId="modals"
          onCloseModal={() => handleToggleModal("secondaryCiiuActivity")}
          activities={economicActivitiesMock}
          selectedActivityId={formik.values.secondaryCiiuActivity}
          onSelect={(item) => handleModalSelect("secondaryCiiuActivity", item)}
        />
      )}
    </>
  );
}

export { EconomicActivityFormUI };
