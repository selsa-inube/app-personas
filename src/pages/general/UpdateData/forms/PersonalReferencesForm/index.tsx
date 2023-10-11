import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalReferencesFormUI } from "./interface";
import { IPersonalReferenceEntries } from "./types";

const validationSchema = Yup.object({
  referenceType: Yup.string().required(validationMessages.required),
  name: validationRules.name.required(validationMessages.required),
  address: validationRules.address.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  phone: validationRules.phone.required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
});

interface PersonalReferencesFormProps {
  initialValues: IPersonalReferenceEntries;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IPersonalReferenceEntries) => void;
}

const PersonalReferencesForm = forwardRef(function PersonalReferencesForm(
  props: PersonalReferencesFormProps,
  ref: React.Ref<FormikProps<IPersonalReferenceEntries>>
) {
  const { initialValues, onFormValid, handleSubmit } = props;

  const [showAddReferenceModal, setShowAddReferenceModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddReferenceModal(!showAddReferenceModal);
  };

  const handleAddReference = async () => {
    await formik.validateForm();
    if (formik.isValid && formik.values.referenceType && formik.values.city) {
      setShowAddReferenceModal(false);

      formik.setFieldValue("entries", [
        ...formik.values.entries,
        {
          id: String(formik.values.entries.length + 1),
          referenceType: getValueOfDomain(
            formik.values.referenceType,
            "referenceType"
          )?.value,
          name: formik.values.name,
          address: formik.values.address,
          email: formik.values.email,
          phone: formik.values.phone,
          city: cityDM.valueOf(formik.values.city)?.value,
          observations: formik.values.observations,
        },
      ]);
    }
  };

  return (
    <PersonalReferencesFormUI
      formik={formik}
      showAddReferenceModal={showAddReferenceModal}
      handleToggleModal={handleToggleModal}
      handleAddReference={handleAddReference}
    />
  );
});

export { PersonalReferencesForm };
