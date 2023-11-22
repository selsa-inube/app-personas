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
import { IMessage, EMessageType } from "@ptypes/messages.types";
import { deleteReferenceMessages } from "./config/deleteReference.config";

const initialMessageState: IMessage = {
  show: false,
  title: "",
  description: "",
  icon: <></>,
  appearance: "primary",
};

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
  const [message, setMessage] = useState(initialMessageState);

  const handleShowMessage = (message: IMessage) => {
    const { title, description, icon, appearance } = message;
    setMessage({
      show: true,
      title,
      description,
      icon,
      appearance,
    });
  };

  const onCloseMessage = () => {
    setMessage(initialMessageState);
  };

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
    let MessageType = EMessageType.SUCCESS;

    const reference = formik.values.entries.find(
      (entry) => entry.id === referenceId
    );

    const updatedReferences = formik.values.entries.filter(
      (reference) => reference.id !== referenceId
    );

    if (updatedReferences.length === formik.values.entries.length) {
      MessageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedReferences);
    }

    const { icon, title, description, appearance } =
      deleteReferenceMessages[MessageType];

    handleShowMessage({
      title,
      description: description(reference?.name),
      icon,
      appearance,
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
      message={message}
      onCloseMessage={onCloseMessage}
    />
  );
});

export { PersonalReferencesForm };
