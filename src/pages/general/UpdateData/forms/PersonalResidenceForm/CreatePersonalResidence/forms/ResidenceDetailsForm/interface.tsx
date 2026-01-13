import { inube } from "@design/tokens";
import {
  Autocomplete,
  Date,
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
  formik: FormikProps<IResidenceDetailsEntry>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  residenceType: string;
  onSelectBankEntity?: (value: string) => void;
}

function ResidenceDetailsFormUI(props: ResidenceDetailsFormUIProps) {
  const {
    formik,
    loading,
    validationSchema,
    serviceDomains,
    residenceType,
    onSelectBankEntity,
  } = props;

  const renderFieldsByResidenceType = () => {

    if (residenceType === "rent") {
      return (
        <>
          <Input
            label="Nombre del arrendador"
            name="landlordName"
            id="landlordName"
            value={formik.values.landlordName}
            message={formik.errors.landlordName}
            disabled={loading}
            size="compact"
            status={getFieldState(formik, "landlordName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(validationSchema, "landlordName")}
            placeholder="Digita el nombre del arrendador"
            fullwidth
          />
          <Phonefield
            type="tel"
            label="Celular del arrendador"
            name="landlordPhone"
            id="landlordPhone"
            value={formik.values.landlordPhone}
            message={formik.errors.landlordPhone}
            disabled={loading}
            size="compact"
            status={getFieldState(formik, "landlordPhone")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
            value={formik.values.ownerName}
            message={formik.errors.ownerName}
            disabled={loading}
            size="compact"
            status={getFieldState(formik, "ownerName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(validationSchema, "ownerName")}
            placeholder="Digita el nombre del titular"
            fullwidth
          />
          <Select
            label="Parentesco"
            name="relationship"
            id="relationship"
            placeholder="Selecciona una opción"
            value={formik.values.relationship}
            fullwidth
            size="compact"
            options={relationshipDM.options}
            onBlur={formik.handleBlur}
            disabled={loading}
            invalid={isInvalid(formik, "relationship")}
            onChange={(name, value) =>
              formikHandleChange(name, value, formik)
            }
            required={isRequired(validationSchema, "relationship")}
          />
          <Phonefield
            type="tel"
            label="Celular del titular"
            name="ownerPhone"
            id="ownerPhone"
            value={formik.values.ownerPhone}
            message={formik.errors.ownerPhone}
            disabled={loading}
            size="compact"
            status={getFieldState(formik, "ownerPhone")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
          value={formik.values.otherType}
          message={formik.errors.otherType}
          disabled={loading}
          size="compact"
          status={getFieldState(formik, "otherType")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
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
            value={formik.values.bankEntityCode}
            size="compact"
            fullwidth
            options={serviceDomains.integratedbanks}
            onBlur={formik.handleBlur}
            message={formik.errors.bankEntityCode}
            invalid={isInvalid(formik, "bankEntityCode")}
            onChange={(_, value) => onSelectBankEntity?.(value)}
            required={isRequired(validationSchema, "bankEntityCode")}
            placeholder="Selecciona una opción"
          />
          <Date
            label="Fecha de terminación"
            name="dueDate"
            id="dueDate"
            value={formik.values.dueDate}
            message={formik.errors.dueDate}
            disabled={loading}
            size="compact"
            status={getFieldState(formik, "dueDate")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
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
          value={formik.values.stratum}
          fullwidth
          size="compact"
          options={stratumDM.options}
          onBlur={formik.handleBlur}
          disabled={loading}
          invalid={isInvalid(formik, "stratum")}
          onChange={(name, value) => formikHandleChange(name, value, formik)}
          required={isRequired(validationSchema, "stratum")}
        />
      </Stack>
    </form>
  );
}

export { ResidenceDetailsFormUI };
