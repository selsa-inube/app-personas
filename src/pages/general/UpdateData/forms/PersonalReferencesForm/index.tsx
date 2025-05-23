import { IAction } from "@design/data/Table/types";
import { useFlag } from "@inubekit/inubekit";
import { EMessageType } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteReference } from "./DeleteReference";
import { EditReference } from "./EditReference";
import { deleteReferenceMessages } from "./config/deleteReference.config";
import { PersonalReferencesFormUI } from "./interface";
import { IPersonalReferenceEntries } from "./types";

const validationSchema = Yup.object({
  referenceType: Yup.string().required(validationMessages.required),
  name: validationRules.name.required(validationMessages.required),
  address: validationRules.address.required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  phone: validationRules.phone.required(validationMessages.required),
  country: Yup.string().required(validationMessages.required),
  department: Yup.string().required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
});

interface PersonalReferencesFormProps {
  initialValues: IPersonalReferenceEntries;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalReferenceEntries) => void;
}

const PersonalReferencesForm = forwardRef(function PersonalReferencesForm(
  props: PersonalReferencesFormProps,
  ref: React.Ref<FormikProps<IPersonalReferenceEntries>>,
) {
  const { initialValues, loading, withSubmit, onSubmit } = props;

  const [showAddReferenceModal, setShowAddReferenceModal] = useState(false);
  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
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
      "country",
      "department",
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
          country: formik.values.country,
          department: formik.values.department,
          city: formik.values.city,
        },
      ]);

      const fieldsToClear = [
        "referenceType",
        "name",
        "address",
        "email",
        "phone",
        "country",
        "department",
        "city",
      ];

      fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
    }

    formik.setTouched({});
  };

  const handleDeleteReference = (referenceId: string) => {
    let MessageType = EMessageType.SUCCESS;

    const reference = formik.values.entries.find(
      (entry) => entry.id === referenceId,
    );

    const updatedReferences = formik.values.entries.filter(
      (reference) => reference.id !== referenceId,
    );

    if (updatedReferences.length === formik.values.entries.length) {
      MessageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedReferences);
    }

    const { title, description, appearance } =
      deleteReferenceMessages[MessageType];

    addFlag({
      title,
      description: description(reference?.name),
      appearance,
      duration: 3000,
    });
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
      actionName: "Eliminar",
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
      personalReferencesTableActions={personalReferencesTableActions}
      loading={loading}
      withSubmit={withSubmit}
      onToggleModal={handleToggleModal}
      onAddReference={handleAddReference}
    />
  );
});

export { PersonalReferencesForm };
