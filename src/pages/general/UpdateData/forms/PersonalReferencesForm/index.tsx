import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalReferencesFormUI } from "./interface";
import { IPersonalReferenceEntries } from "./types";
import { IAction } from "@design/data/Table/types";
import { DeleteReference } from "./DeleteReference";
import { EditReference } from "./EditReference";

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
  handleSubmit?: (values: IPersonalReferenceEntries) => void;
}

const PersonalReferencesForm = forwardRef(function PersonalReferencesForm(
  props: PersonalReferencesFormProps,
  ref: React.Ref<FormikProps<IPersonalReferenceEntries>>
) {
  const { initialValues, handleSubmit } = props;

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
    const fieldsToClear = [
      "referenceType",
      "name",
      "address",
      "email",
      "phone",
      "city",
    ];

    fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
    formik.setTouched({});
  };

  const handleAddReference = async () => {
    await formik.validateForm();
    if (formik.isValid && formik.values.referenceType && formik.values.city) {
      setShowAddReferenceModal(false);

      formik.setFieldValue("entries", [
        ...formik.values.entries,
        {
          id: String(formik.values.entries.length + 1),
          referenceType: formik.values.referenceType,
          name: formik.values.name,
          address: formik.values.address,
          email: formik.values.email,
          phone: formik.values.phone,
          city: formik.values.city,
        },
      ]);

      const fieldsToClear = [
        "referenceType",
        "name",
        "address",
        "email",
        "phone",
        "city",
      ];

      fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
    }

    formik.setTouched({});
  };

  const handleDeleteReference = (referenceId: string) => {
    const updatedReferences = formik.values.entries.filter(
      (reference) => reference.id !== referenceId
    );

    formik.setFieldValue("entries", updatedReferences);
  };

  const personalReferencesTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Editar",
      content: (reference) => (
        <EditReference reference={reference} formik={formik} />
      ),
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Borrar",
      content: (reference) => (
        <DeleteReference
          reference={reference}
          handleDeleteReference={() => handleDeleteReference(reference.id)}
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <PersonalReferencesFormUI
      formik={formik}
      showAddReferenceModal={showAddReferenceModal}
      handleToggleModal={handleToggleModal}
      handleAddReference={handleAddReference}
      personalReferencesTableActions={personalReferencesTableActions}
    />
  );
});

export { PersonalReferencesForm };
