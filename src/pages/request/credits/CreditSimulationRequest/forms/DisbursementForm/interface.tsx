import { FormikValues } from "formik";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { inube } from "@design/tokens";
import { Select } from "@design/input/Select";
import { Stack } from "@design/layout/Stack";
import { Textarea } from "@design/input/Textarea";
import { Grid } from "@design/layout/Grid";
import { TextField } from "@design/input/TextField";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { savingsMock } from "@mocks/products/savings/savings.mocks";
import { identificationTypeDM } from "src/model/domains/personalInformation/identificationtypedm";
import { genderDM } from "src/model/domains/personalInformation/genderdm";
import { suppliersTypeData } from "@mocks/domains/suppliersType";
import { bankData } from "@mocks/domains/bank";
import { accountTypeData } from "@mocks/domains/accountType";
import { usersMock } from "@mocks/users/users.mocks";
import { statusDM } from "src/model/domains/general/statusdm";

interface DisbursementFormUIProps {
  formik: FormikValues;
  loading?: boolean;
  customHandleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  customHandleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function DisbursementFormUI(props: DisbursementFormUIProps) {
  const { formik, loading, customHandleBlur, customHandleChange } = props;

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const isTablet = useMediaQuery("(max-width: 900px)");

  const creditDisbursementDM = getDomainById("creditDisbursement");

  const filteredOptionsIdentificationType = identificationTypeDM.options.filter(
    (option) => option.id !== "rc" && option.id !== "ti"
  );

  return (
    <form>
      <Stack direction="column" gap="s300">
        <Select
          name="creditDisbursement"
          id="creditDisbursement"
          label="Forma de desembolso"
          value={formik.values.creditDisbursement}
          size="compact"
          isDisabled={loading}
          options={creditDisbursementDM}
          handleChange={customHandleChange}
          handleBlur={customHandleBlur}
          state={stateValue("creditDisbursement")}
          errorMessage={formik.errors.creditDisbursement}
          isFullWidth
        />
        {formik.values.creditDisbursement === "localSavingsDeposit" && (
          <Select
            name="accountNumber"
            id="accountNumber"
            label="Numero de cuenta"
            value={formik.values.accountNumber}
            size="compact"
            isDisabled={loading}
            options={savingsMock
              .filter((product) => product.type === "CA")
              .map((product) => ({
                value: product.description,
                id: product.id,
              }))}
            handleChange={customHandleChange}
            handleBlur={customHandleBlur}
            state={stateValue("accountNumber")}
            errorMessage={formik.errors.accountNumber}
            isFullWidth
          />
        )}
        {(formik.values.creditDisbursement === "multiplePaymentRecipients" ||
          formik.values.creditDisbursement === "others") && (
          <Textarea
            name="observations"
            id="observations"
            label="Observaciones"
            placeholder="Describe las múltiples formas de desembolso que deseas utilizar."
            maxLength={150}
            value={formik.values.observations}
            handleBlur={customHandleBlur}
            handleChange={formik.handleChange}
            handleFocus={formik.isFocused}
            isDisabled={loading}
            isFullWidth
          />
        )}
        {(formik.values.creditDisbursement === "supplierManagerCheck" ||
          formik.values.creditDisbursement === "supplierPayeeCheck") && (
          <Select
            name="supplier"
            id="supplier"
            label="Proveedor"
            value={formik.values.supplier}
            size="compact"
            isDisabled={loading}
            options={suppliersTypeData.map((supplier) => ({
              value: supplier.value,
              id: supplier.id,
            }))}
            handleChange={customHandleChange}
            handleBlur={customHandleBlur}
            state={stateValue("supplier")}
            errorMessage={formik.errors.supplier}
            isFullWidth
          />
        )}
        {(formik.values.creditDisbursement === "thirdPartManagerCheck" ||
          formik.values.creditDisbursement === "thirdPartPayeeCheck") && (
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap={
              isTablet ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`
            }
          >
            <Select
              name="identificationType"
              id="identificationType"
              label="Tipo de identificación"
              value={formik.values.identificationType}
              size="compact"
              isDisabled={loading}
              options={filteredOptionsIdentificationType}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("identificationType")}
              errorMessage={formik.errors.identificationType}
              isFullWidth
            />
            {formik.values.identificationType === "nit" ? (
              <>
                <TextField
                  name="identification"
                  id="identification"
                  label="Identificación"
                  placeholder="Escribe el numero de identificación"
                  size="compact"
                  type="number"
                  value={formik.values.identification}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de identificación ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="socialReason"
                  id="socialReason"
                  label="Razón social"
                  placeholder="Escribe el nombre"
                  size="compact"
                  type="text"
                  value={formik.values.socialReason}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre de razón social ingresado es válido"
                  isFullWidth
                />
              </>
            ) : formik.values.identificationType === "cc" ||
              formik.values.identificationType === "ce" ||
              formik.values.identificationType === "pa" ? (
              <>
                <TextField
                  name="identification"
                  id="identification"
                  label="Identificación"
                  placeholder="Escribe el numero de identificación"
                  size="compact"
                  type="number"
                  value={formik.values.identification}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de identificación ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="firstName"
                  id="firstName"
                  label="Primer nombre"
                  placeholder="Primer nombre"
                  size="compact"
                  type="text"
                  value={formik.values.firstName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="secondName"
                  id="secondName"
                  label="Segundo nombre"
                  placeholder="Segundo nombre"
                  size="compact"
                  type="text"
                  value={formik.values.secondName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="firstLastName"
                  id="firstLastName"
                  label="Primer apellido"
                  placeholder="Primer apellido"
                  size="compact"
                  type="text"
                  value={formik.values.firstLastName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El apellido ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="secondLastName"
                  id="secondLastName"
                  label="Segundo apellido"
                  placeholder="Segundo apellido"
                  size="compact"
                  type="text"
                  value={formik.values.secondLastName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El apellido ingresado es válido"
                  isFullWidth
                />
                <Select
                  name="gender"
                  id="gender"
                  label="Género"
                  value={formik.values.gender}
                  size="compact"
                  isDisabled={loading}
                  options={genderDM.options}
                  handleChange={formik.handleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("gender")}
                  errorMessage={formik.errors.gender}
                  isFullWidth
                />
              </>
            ) : null}
          </Grid>
        )}
        {formik.values.creditDisbursement === "ownAccountTransfer" && (
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap={
              isTablet ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`
            }
          >
            <Select
              name="account"
              id="account"
              label="Cuenta"
              value={formik.values.account}
              options={statusDM.options}
              size="compact"
              isDisabled={loading}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("account")}
              errorMessage={formik.errors.account}
              isFullWidth
            />
            {formik.values.account === "new" ? (
              <>
                <Select
                  name="entity"
                  id="entity"
                  label="Entidad"
                  value={formik.values.entity}
                  options={bankData.map((bank) => ({
                    value: bank.value,
                    id: bank.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  handleChange={customHandleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("entity")}
                  errorMessage={formik.errors.entity}
                  isFullWidth
                />
                <Select
                  name="accountType"
                  id="accountType"
                  label="Tipo de cuenta"
                  value={formik.values.accountType}
                  options={accountTypeData.map((accountType) => ({
                    value: accountType.value,
                    id: accountType.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  handleChange={customHandleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("accountType")}
                  errorMessage={formik.errors.accountType}
                  isFullWidth
                />
                <TextField
                  name="accountNumber"
                  id="accountNumber"
                  label="Numero de cuenta"
                  placeholder="Escribe el numero de cuenta"
                  size="compact"
                  type="number"
                  value={formik.values.accountNumber}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de cuenta ingresado es válido"
                  isFullWidth
                />
              </>
            ) : formik.values.account === "registred" ? (
              <>
                <Select
                  name="entity"
                  id="entity"
                  label="Entidad"
                  value={usersMock[0].bankTransfersAccount.bankingEntity}
                  options={bankData.map((bank) => ({
                    value: bank.value,
                    id: bank.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  state={stateValue("entity")}
                  handleBlur={formik.handleBlur}
                  handleChange={customHandleChange}
                  errorMessage={formik.errors.entity}
                  isFullWidth
                  readOnly
                />
                <Select
                  name="accountType"
                  id="accountType"
                  label="Tipo de cuenta"
                  value={usersMock[0].bankTransfersAccount.accountType}
                  options={accountTypeData.map((accountType) => ({
                    value: accountType.value,
                    id: accountType.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  state={stateValue("accountType")}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  errorMessage={formik.errors.accountType}
                  isFullWidth
                  readOnly
                />
                <TextField
                  name="accountNumber"
                  id="accountNumber"
                  label="Numero de cuenta"
                  placeholder="Escribe el numero de cuenta"
                  size="compact"
                  type="number"
                  value={usersMock[0].bankTransfersAccount.accountNumber}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de cuenta ingresado es válido"
                  isFullWidth
                  readOnly
                />
              </>
            ) : null}
          </Grid>
        )}
        {formik.values.creditDisbursement === "supplierExternalTransfer" && (
          <>
            <Select
              name="supplier"
              id="supplier"
              label="Proveedor"
              value={formik.values.supplier}
              options={suppliersTypeData.map((supplier) => ({
                value: supplier.value,
                id: supplier.id,
              }))}
              size="compact"
              isDisabled={loading}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("supplier")}
              errorMessage={formik.errors.supplier}
              isFullWidth
            />
            <Select
              name="entity"
              id="entity"
              label="Entidad"
              value={formik.values.entity}
              options={bankData.map((bank) => ({
                value: bank.value,
                id: bank.id,
              }))}
              size="compact"
              isDisabled={loading}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("entity")}
              errorMessage={formik.errors.entity}
              isFullWidth
            />
            <Select
              name="accountType"
              id="accountType"
              label="Tipo de cuenta"
              value={formik.values.accountType}
              options={accountTypeData.map((accountType) => ({
                value: accountType.value,
                id: accountType.id,
              }))}
              size="compact"
              isDisabled={loading}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("accountType")}
              errorMessage={formik.errors.accountType}
              isFullWidth
            />
            <TextField
              name="accountNumber"
              id="accountNumber"
              label="Numero de cuenta"
              placeholder="Escribe el numero de cuenta"
              size="compact"
              type="number"
              value={formik.values.accountNumber}
              handleBlur={customHandleBlur}
              handleChange={customHandleChange}
              validMessage="El número de cuenta ingresado es válido"
              isFullWidth
            />
          </>
        )}
        {formik.values.creditDisbursement === "thirdPartExternalTransfer" && (
          <Grid
            templateColumns={isTablet ? "1fr" : "1fr 1fr"}
            gap={
              isTablet ? "s150" : `${inube.spacing.s200} ${inube.spacing.s300}`
            }
          >
            <Select
              name="identificationType"
              id="identificationType"
              label="Tipo de identificación"
              value={formik.values.identificationType}
              size="compact"
              isDisabled={loading}
              options={filteredOptionsIdentificationType}
              handleChange={customHandleChange}
              handleBlur={customHandleBlur}
              state={stateValue("identificationType")}
              errorMessage={formik.errors.identificationType}
              isFullWidth
            />
            {formik.values.identificationType === "nit" ? (
              <>
                <TextField
                  name="identification"
                  id="identification"
                  label="Identificación"
                  placeholder="Escribe el numero de identificación"
                  size="compact"
                  type="number"
                  value={formik.values.identification}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de identificación ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="socialReason"
                  id="socialReason"
                  label="Razón social"
                  placeholder="Escribe el nombre"
                  size="compact"
                  type="text"
                  value={formik.values.socialReason}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre de razón social ingresado es válido"
                  isFullWidth
                />
                <Select
                  name="entity"
                  id="entity"
                  label="Entidad"
                  value={formik.values.entity}
                  options={bankData.map((bank) => ({
                    value: bank.value,
                    id: bank.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  handleChange={customHandleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("entity")}
                  errorMessage={formik.errors.entity}
                  isFullWidth
                />
                <Select
                  name="accountType"
                  id="accountType"
                  label="Tipo de cuenta"
                  value={formik.values.accountType}
                  options={accountTypeData.map((accountType) => ({
                    value: accountType.value,
                    id: accountType.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  state={stateValue("accountType")}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  errorMessage={formik.errors.accountType}
                  isFullWidth
                />
                <TextField
                  name="accountNumber"
                  id="accountNumber"
                  label="Numero de cuenta"
                  placeholder="Escribe el numero de cuenta"
                  size="compact"
                  type="number"
                  value={formik.values.accountNumber}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de cuenta ingresado es válido"
                  isFullWidth
                />
              </>
            ) : formik.values.identificationType === "cc" ||
              formik.values.identificationType === "ce" ||
              formik.values.identificationType === "pa" ? (
              <>
                <TextField
                  name="identification"
                  id="identification"
                  label="Identificación"
                  placeholder="Escribe el numero de identificación"
                  size="compact"
                  type="number"
                  value={formik.values.identification}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de identificación ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="firstName"
                  id="firstName"
                  label="Primer nombre"
                  placeholder="Primer nombre"
                  size="compact"
                  type="text"
                  value={formik.values.firstName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="secondName"
                  id="secondName"
                  label="Segundo nombre"
                  placeholder="Segundo nombre"
                  size="compact"
                  type="text"
                  value={formik.values.secondName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El nombre ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="firstLastName"
                  id="firstLastName"
                  label="Primer apellido"
                  placeholder="Primer apellido"
                  size="compact"
                  type="text"
                  value={formik.values.firstLastName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El apellido ingresado es válido"
                  isFullWidth
                />
                <TextField
                  name="secondLastName"
                  id="secondLastName"
                  label="Segundo apellido"
                  placeholder="Segundo apellido"
                  size="compact"
                  type="text"
                  value={formik.values.secondLastName}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El apellido ingresado es válido"
                  isFullWidth
                />
                <Select
                  name="gender"
                  id="gender"
                  label="Género"
                  value={formik.values.gender}
                  size="compact"
                  isDisabled={loading}
                  options={genderDM.options}
                  handleChange={formik.handleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("gender")}
                  errorMessage={formik.errors.gender}
                  isFullWidth
                />
                <Select
                  name="entity"
                  id="entity"
                  label="Entidad"
                  value={formik.values.entity}
                  options={bankData.map((bank) => ({
                    value: bank.value,
                    id: bank.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  handleChange={customHandleChange}
                  handleBlur={customHandleBlur}
                  state={stateValue("entity")}
                  errorMessage={formik.errors.entity}
                  isFullWidth
                />
                <Select
                  name="accountType"
                  id="accountType"
                  label="Tipo de cuenta"
                  value={formik.values.accountType}
                  options={accountTypeData.map((accountType) => ({
                    value: accountType.value,
                    id: accountType.id,
                  }))}
                  size="compact"
                  isDisabled={loading}
                  state={stateValue("accountType")}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  errorMessage={formik.errors.accountType}
                  isFullWidth
                />
                <TextField
                  name="accountNumber"
                  id="accountNumber"
                  label="Numero de cuenta"
                  placeholder="Escribe el numero de cuenta"
                  size="compact"
                  type="number"
                  value={formik.values.accountNumber}
                  handleBlur={customHandleBlur}
                  handleChange={customHandleChange}
                  validMessage="El número de cuenta ingresado es válido"
                  isFullWidth
                />
              </>
            ) : null}
          </Grid>
        )}
      </Stack>
    </form>
  );
}

export { DisbursementFormUI };
