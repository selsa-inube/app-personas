import { inube } from "@design/tokens";
import {
  Autocomplete,
  Date,
  IOption,
  Input,
  Phonefield,
  Select,
  Stack,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { stratumDM } from "src/model/domains/general/updateData/personalResidence/stratumdm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import { IResidenceDetailsEntry } from "./types";
import { IServiceDomains } from "src/context/app/types";
import * as Yup from "yup";

interface ResidenceDetailsFormUIProps {
  localFormik: FormikProps<IResidenceDetailsEntry>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  residenceType: string;
}

function ResidenceDetailsFormUI(props: ResidenceDetailsFormUIProps) {
  const {
    localFormik,
    loading,
    validationSchema,
    serviceDomains,
    residenceType,
  } = props;

  const handleSelectBankEntity = (value: string) => {
    const selectedBankEntity = serviceDomains.integratedbanks.find(
      (bank: IOption) => bank.value === value,
    );
    localFormik.setFieldValue("bankEntityCode", value);
    localFormik.setFieldValue("bankEntityName", selectedBankEntity?.label || "");
  };

  const renderFieldsByResidenceType = () => {

    if (residenceType === "rent") {
      return (
        <>
          <Input
            label="Nombre del arrendador"
            name="landlordName"
            id="landlordName"
            value={localFormik.values.landlordName}
            message={localFormik.errors.landlordName}
            disabled={loading}
            size="compact"
            status={getFieldState(localFormik, "landlordName")}
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(validationSchema, "landlordName")}
            placeholder="Digita el nombre del arrendador"
            fullwidth
          />
          <Phonefield
            type="tel"
            label="Celular del arrendador"
            name="landlordPhone"
            id="landlordPhone"
            value={localFormik.values.landlordPhone}
            message={localFormik.errors.landlordPhone}
            disabled={loading}
            size="compact"
            status={getFieldState(localFormik, "landlordPhone")}
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(validationSchema, "landlordPhone")}
            placeholder="Digita el número de celular"
            fullwidth
          />
        </>
      );
    }

    if (residenceType === "familiar") {
      return (
        <>
          <Input
            label="Nombre del titular"
            name="ownerName"
            id="ownerName"
            value={localFormik.values.ownerName}
            message={localFormik.errors.ownerName}
            disabled={loading}
            size="compact"
            status={getFieldState(localFormik, "ownerName")}
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(validationSchema, "ownerName")}
            placeholder="Digita el nombre del titular"
            fullwidth
          />
          <Select
            label="Parentesco"
            name="relationship"
            id="relationship"
            placeholder="Selecciona una opción"
            value={localFormik.values.relationship}
            fullwidth
            size="compact"
            options={relationshipDM.options}
            onBlur={localFormik.handleBlur}
            disabled={loading}
            invalid={isInvalid(localFormik, "relationship")}
            onChange={(name, value) =>
              formikHandleChange(name, value, localFormik)
            }
            required={isRequired(validationSchema, "relationship")}
          />
          <Phonefield
            type="tel"
            label="Celular del titular"
            name="ownerPhone"
            id="ownerPhone"
            value={localFormik.values.ownerPhone}
            message={localFormik.errors.ownerPhone}
            disabled={loading}
            size="compact"
            status={getFieldState(localFormik, "ownerPhone")}
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(validationSchema, "ownerPhone")}
            placeholder="Digita el número de celular"
            fullwidth
          />
        </>
      );
    }

    if (residenceType === "other") {
      return (
        <Input
          label="¿Cuál es el tipo de vivienda?"
          name="otherType"
          id="otherType"
          value={localFormik.values.otherType}
          message={localFormik.errors.otherType}
          disabled={loading}
          size="compact"
          status={getFieldState(localFormik, "otherType")}
          onBlur={localFormik.handleBlur}
          onChange={localFormik.handleChange}
          required={isRequired(validationSchema, "otherType")}
          maxLength={20}
          placeholder="Digita cual es el tipo de vivienda"
          fullwidth
        />
      );
    }

    if (residenceType === "ownWithMortgage") {
      return (
        <>
          <Autocomplete
            label="Entidad bancaria"
            name="bankEntityCode"
            id="bankEntityCode"
            value={localFormik.values.bankEntityCode}
            size="compact"
            fullwidth
            options={serviceDomains.integratedbanks}
            onBlur={localFormik.handleBlur}
            message={localFormik.errors.bankEntityCode}
            invalid={isInvalid(localFormik, "bankEntityCode")}
            onChange={(_, value) => handleSelectBankEntity(value)}
            required={isRequired(validationSchema, "bankEntityCode")}
            placeholder="Selecciona una opción"
          />
          <Date
            label="Fecha de terminación"
            name="dueDate"
            id="dueDate"
            value={localFormik.values.dueDate}
            message={localFormik.errors.dueDate}
            disabled={loading}
            size="compact"
            status={getFieldState(localFormik, "dueDate")}
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(validationSchema, "dueDate")}
            fullwidth
          />
        </>
      );
    }

    return null;
  };

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s200}>
        {renderFieldsByResidenceType()}
        <Select
          label="Estrato"
          name="stratum"
          id="stratum"
          placeholder="Selecciona una opción"
          value={localFormik.values.stratum}
          fullwidth
          size="compact"
          options={stratumDM.options}
          onBlur={localFormik.handleBlur}
          disabled={loading}
          invalid={isInvalid(localFormik, "stratum")}
          onChange={(name, value) => formikHandleChange(name, value, localFormik)}
          required={isRequired(validationSchema, "stratum")}
        />
      </Stack>
    </form>
  );
}

export { ResidenceDetailsFormUI };
