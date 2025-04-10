import { IEntry } from "@design/data/Table/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { IPersonalReferenceEntries, IPersonalReferenceEntry } from "../types";
import { EditReferenceUI } from "./interface";

interface EditReferenceProps {
  reference: IEntry;
  formik: FormikProps<IPersonalReferenceEntries>;
}

const getEditReference = (
  reference: IPersonalReferenceEntry,
  formik: FormikProps<IPersonalReferenceEntries>,
) => {
  const referenceToEdit = formik.values.entries.find(
    (entry: IPersonalReferenceEntry) => entry.id === reference.id,
  );

  if (referenceToEdit) {
    formik.setValues({
      entries: formik.values.entries,
      ...referenceToEdit,
    });
  }
};

function EditReference(props: EditReferenceProps) {
  const { reference, formik } = props;

  const [showModal, setShowModal] = useState(false);

  const handleEditReference = async () => {
    await formik.validateForm();

    if (formik.isValid && formik.values.referenceType) {
      setShowModal(false);
      const updatedEntries = formik.values.entries.map(
        (entry: IPersonalReferenceEntry) => {
          if (entry.id === reference.id) {
            return {
              id: reference.id,
              referenceType: formik.values.referenceType,
              name: formik.values.name,
              address: formik.values.address,
              email: formik.values.email,
              phone: formik.values.phone,
              country: formik.values.country,
              department: formik.values.department,
              city: formik.values.city,
            };
          }
          return entry;
        },
      );

      formik.setFieldValue("entries", updatedEntries);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
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
  };

  const handleEditModal = () => {
    setShowModal(true);
    getEditReference(reference, formik);
  };

  return (
    <EditReferenceUI
      formik={formik}
      showModal={showModal}
      handleEditModal={handleEditModal}
      handleEditReference={handleEditReference}
      closeModal={handleToggleModal}
    />
  );
}

export { EditReference };
