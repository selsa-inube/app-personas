import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalReferencesFormUI } from "./interface";
import { IPersonalReferenceEntries } from "./types";
import { IAction } from "@design/data/Table/types";
import { Icon } from "@design/data/Icon";
import { MdOutlineModeEdit } from "react-icons/md";
import { DeleteReference } from "./DeleteReference";

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
          referenceType: formik.values.referenceType,
          name: formik.values.name,
          address: formik.values.address,
          email: formik.values.email,
          phone: formik.values.phone,
          city: formik.values.city,
          observations: formik.values.observations,
        },
      ]);
    }
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
        <Icon
          appearance="dark"
          icon={<MdOutlineModeEdit />}
          cursorHover={true}
          size="16px"
          spacing="none"
        />
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
