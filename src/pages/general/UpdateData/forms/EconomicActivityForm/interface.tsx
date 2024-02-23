import { EconomicActivityModal } from "@components/modals/forms/update-data/EconomicActivityModal";
import { DateField } from "@design/input/DateField";
import { Fieldset } from "@design/input/Fieldset";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Grid } from "@design/layout/Grid";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { companiesData } from "@mocks/domains/companies";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import {
  IEconomicActivity,
  economicActivitiesMock,
} from "@mocks/users/economicActivities.mocks";
import { FormikValues } from "formik";
import { MdSearch } from "react-icons/md";
import { companyFormalityDM } from "src/model/domains/economicActivity/companyformalitydm";
import { contractTypeDM } from "src/model/domains/economicActivity/contracttypedm";
import { economicActivityDM } from "src/model/domains/economicActivity/economicactivitydm";
import { severanceRegimeDM } from "src/model/domains/economicActivity/severanceregimedm";
import { workdayDM } from "src/model/domains/economicActivity/workdaydm";
import { countryDM } from "src/model/domains/financialOperations/countrydm";
import { getFieldState } from "src/utils/forms/forms";

interface EconomicActivityFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  showMainActivityModal: boolean;
  showSecondaryActivityModal: boolean;
  isRequired: (fieldName: string) => boolean;
  handleToggleModal: (field: string) => void;
  handleModalSelect: (field: string, selectedItem: IEconomicActivity) => void;
}

function EconomicActivityFormUI(props: EconomicActivityFormUIProps) {
  const {
    formik,
    loading,
    showMainActivityModal,
    showSecondaryActivityModal,
    isRequired,
    handleToggleModal,
    handleModalSelect,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <form>
        <Stack direction="column" gap="s300">
          <Fieldset
            title="Clasificación económica"
            type={isMobile ? "label" : "title"}
          >
            <Grid
              templateColumns={
                isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
              }
              gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
            >
              <Select
                label="Actividad económica"
                name="economicActivity"
                id="economicActivity"
                value={formik.values.economicActivity}
                size="compact"
                options={economicActivityDM.options}
                state={getFieldState(formik, "economicActivity")}
                isRequired={isRequired("economicActivity")}
                errorMessage={formik.errors.economicActivity}
                onBlur={formik.handleBlur}
                onClick={formik.handleClick}
                onFocus={formik.handleFocus}
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
                    isRequired={isRequired("profession")}
                    errorMessage={formik.errors.profession}
                    onBlur={formik.handleBlur}
                    onClick={formik.handleClick}
                    onFocus={formik.handleFocus}
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
                    validMessage="El Oficio es válido"
                    isRequired={isRequired("job")}
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
                    validMessage="La actividad es valida"
                    isRequired={isRequired("mainCiiuActivity")}
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
                    validMessage="La actividad es valida"
                    isRequired={isRequired("secondaryCiiuActivity")}
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
                    isRequired={isRequired("economicSector")}
                    errorMessage={formik.errors.economicSector}
                    onBlur={formik.handleBlur}
                    onClick={formik.handleClick}
                    onFocus={formik.handleFocus}
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
              title="Detalles laborales"
              type={isMobile ? "label" : "title"}
            >
              <Grid
                templateColumns={
                  isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr"
                }
                gap={isMobile ? "s150" : isTablet ? "s200" : "s300"}
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
                  validMessage="La empresa es válida"
                  isRequired={isRequired("company")}
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
                  isRequired={isRequired("contractType")}
                  errorMessage={formik.errors.contractType}
                  onBlur={formik.handleBlur}
                  onClick={formik.handleClick}
                  onFocus={formik.handleFocus}
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
                  validMessage="La fecha de ingreso es válida"
                  isRequired={isRequired("admissionDate")}
                  isFullWidth
                />
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
                  validMessage="La fecha de vencimiento es válida"
                  isRequired={isRequired("contractExpiration")}
                />
                <Select
                  label="Régimen de cesantías"
                  name="severanceRegime"
                  id="severanceRegime"
                  value={formik.values.severanceRegime}
                  size="compact"
                  options={severanceRegimeDM.options}
                  state={getFieldState(formik, "severanceRegime")}
                  isRequired={isRequired("severanceRegime")}
                  errorMessage={formik.errors.severanceRegime}
                  onBlur={formik.handleBlur}
                  onClick={formik.handleClick}
                  onFocus={formik.handleFocus}
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
                  isRequired={isRequired("workday")}
                  errorMessage={formik.errors.workday}
                  onBlur={formik.handleBlur}
                  onClick={formik.handleClick}
                  onFocus={formik.handleFocus}
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
                  isRequired={isRequired("position")}
                  errorMessage={formik.errors.position}
                  validMessage="El cargo es válido"
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleFocus}
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
                  isRequired={isRequired("dependence")}
                  errorMessage={formik.errors.dependence}
                  validMessage="La dependencia es válida"
                  onBlur={formik.handleBlur}
                  onFocus={formik.handleFocus}
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
                  validMessage="El código como empleado es válido"
                  isRequired={isRequired("employeeCode")}
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
                        isRequired={isRequired("companyFormality")}
                        errorMessage={formik.errors.companyFormality}
                        onBlur={formik.handleBlur}
                        onClick={formik.handleClick}
                        onFocus={formik.handleFocus}
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
                        isRequired={isRequired("companyCountry")}
                        errorMessage={formik.errors.companyCountry}
                        onBlur={formik.handleBlur}
                        onClick={formik.handleClick}
                        onFocus={formik.handleFocus}
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
                        validMessage="La ciudad es válida"
                        isRequired={isRequired("companyCity")}
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
                        validMessage="El teléfono de la empresa es válido"
                        isRequired={isRequired("companyPhone")}
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
                        validMessage="La dirección de la empresa es válida"
                        isRequired={isRequired("companyAddress")}
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
                        validMessage="El correo electrónico de la empresa es válido"
                        isRequired={isRequired("companyEmail")}
                      />
                    </>
                  ))}
              </Grid>
            </Fieldset>
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
