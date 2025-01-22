import { EconomicActivityModal } from "@components/modals/general/updateData/EconomicActivityModal";
import { DateField } from "@design/input/DateField";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Fieldset, Grid, Stack } from "@inubekit/inubekit";
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
import { getFieldState, isRequired } from "src/utils/forms/forms";
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
                state={getFieldState(formik, "economicActivity")}
                isRequired={isRequired(validationSchema, "economicActivity")}
                errorMessage={formik.errors.economicActivity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isDisabled={loading}
                isFullWidth
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
                    state={getFieldState(formik, "profession")}
                    isRequired={isRequired(validationSchema, "profession")}
                    errorMessage={formik.errors.profession}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isDisabled={loading}
                    isFullWidth
                  />
                  <TextField
                    label="Oficio"
                    placeholder="Oficio"
                    name="job"
                    id="job"
                    value={formik.values.job}
                    errorMessage={formik.errors.job}
                    isDisabled={loading}
                    size="compact"
                    isFullWidth
                    state={getFieldState(formik, "job")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={isRequired(validationSchema, "job")}
                  />
                  <TextField
                    label="Actividad CIIU principal"
                    placeholder="Buscar actividad"
                    name="mainCiiuActivity"
                    id="mainCiiuActivity"
                    value={formik.values.mainCiiuActivity}
                    errorMessage={formik.errors.mainCiiuActivity}
                    isDisabled={loading}
                    iconAfter={<MdSearch size={18} cursor={"pointer"} />}
                    size="compact"
                    isFullWidth
                    state={getFieldState(formik, "mainCiiuActivity")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={isRequired(
                      validationSchema,
                      "mainCiiuActivity",
                    )}
                    onIconClick={() => handleToggleModal("mainCiiuActivity")}
                  />
                  <TextField
                    label="Actividad CIIU secundaria"
                    placeholder="Buscar actividad"
                    name="secondaryCiiuActivity"
                    id="secondaryCiiuActivity"
                    value={formik.values.secondaryCiiuActivity}
                    errorMessage={formik.errors.secondaryCiiuActivity}
                    isDisabled={loading}
                    iconAfter={<MdSearch size={18} cursor={"pointer"} />}
                    size="compact"
                    isFullWidth
                    state={getFieldState(formik, "secondaryCiiuActivity")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={isRequired(
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
                    state={getFieldState(formik, "economicSector")}
                    isRequired={isRequired(validationSchema, "economicSector")}
                    errorMessage={formik.errors.economicSector}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isDisabled={loading}
                    isFullWidth
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
                  errorMessage={formik.errors.company}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={getFieldState(formik, "company")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isRequired={isRequired(validationSchema, "company")}
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
                  state={getFieldState(formik, "contractType")}
                  isRequired={isRequired(validationSchema, "contractType")}
                  errorMessage={formik.errors.contractType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
                />
                <DateField
                  label="Fecha de ingreso"
                  name="admissionDate"
                  id="admissionDate"
                  value={formik.values.admissionDate}
                  errorMessage={formik.errors.admissionDate}
                  isDisabled={loading}
                  state={getFieldState(formik, "admissionDate")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isRequired={isRequired(validationSchema, "admissionDate")}
                  isFullWidth
                />

                {formik.values.contractType !== contractTypeDM.PERMANENT.id && (
                  <DateField
                    label="Vencimiento del contrato"
                    name="contractExpiration"
                    id="contractExpiration"
                    value={formik.values.contractExpiration}
                    errorMessage={formik.errors.contractExpiration}
                    isDisabled={loading}
                    size="compact"
                    isFullWidth
                    state={getFieldState(formik, "contractExpiration")}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    isRequired={isRequired(
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
                  state={getFieldState(formik, "severanceRegime")}
                  isRequired={isRequired(validationSchema, "severanceRegime")}
                  errorMessage={formik.errors.severanceRegime}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
                />
                <Select
                  label="Jornada laboral"
                  name="workday"
                  id="workday"
                  value={formik.values.workday}
                  size="compact"
                  options={workdayDM.options}
                  state={getFieldState(formik, "workday")}
                  isRequired={isRequired(validationSchema, "workday")}
                  errorMessage={formik.errors.workday}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
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
                  isRequired={isRequired(validationSchema, "position")}
                  errorMessage={formik.errors.position}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
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
                  isRequired={isRequired(validationSchema, "dependence")}
                  errorMessage={formik.errors.dependence}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isDisabled={loading}
                  isFullWidth
                />
                <TextField
                  label="Código como empleado"
                  placeholder="Código como empleado"
                  name="employeeCode"
                  id="employeeCode"
                  value={formik.values.employeeCode}
                  errorMessage={formik.errors.employeeCode}
                  isDisabled={loading}
                  size="compact"
                  isFullWidth
                  state={getFieldState(formik, "employeeCode")}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isRequired={isRequired(validationSchema, "employeeCode")}
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
                        state={getFieldState(formik, "companyFormality")}
                        isRequired={isRequired(
                          validationSchema,
                          "companyFormality",
                        )}
                        errorMessage={formik.errors.companyFormality}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isDisabled={loading}
                        isFullWidth
                      />
                      <Select
                        label="País de la empresa"
                        name="companyCountry"
                        id="companyCountry"
                        value={formik.values.companyCountry}
                        size="compact"
                        options={countryDM.options}
                        state={getFieldState(formik, "companyCountry")}
                        isRequired={isRequired(
                          validationSchema,
                          "companyCountry",
                        )}
                        errorMessage={formik.errors.companyCountry}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isDisabled={loading}
                        isFullWidth
                      />
                      <TextField
                        label="Ciudad de la empresa"
                        placeholder="Ciudad de la empresa"
                        name="companyCity"
                        id="companyCity"
                        value={formik.values.companyCity}
                        errorMessage={formik.errors.companyCity}
                        isDisabled={loading}
                        size="compact"
                        isFullWidth
                        state={getFieldState(formik, "companyCity")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isRequired={isRequired(validationSchema, "companyCity")}
                      />
                      <TextField
                        label="Teléfono de la empresa"
                        placeholder="Teléfono de la empresa"
                        name="companyPhone"
                        id="companyPhone"
                        value={formik.values.companyPhone}
                        errorMessage={formik.errors.companyPhone}
                        isDisabled={loading}
                        size="compact"
                        isFullWidth
                        state={getFieldState(formik, "companyPhone")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isRequired={isRequired(
                          validationSchema,
                          "companyPhone",
                        )}
                      />
                      <TextField
                        label="Dirección de la empresa"
                        placeholder="Dirección de la empresa"
                        name="companyAddress"
                        id="companyAddress"
                        value={formik.values.companyAddress}
                        errorMessage={formik.errors.companyAddress}
                        isDisabled={loading}
                        size="compact"
                        isFullWidth
                        state={getFieldState(formik, "companyAddress")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isRequired={isRequired(
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
                        errorMessage={formik.errors.companyEmail}
                        isDisabled={loading}
                        size="compact"
                        isFullWidth
                        state={getFieldState(formik, "companyEmail")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isRequired={isRequired(
                          validationSchema,
                          "companyEmail",
                        )}
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
