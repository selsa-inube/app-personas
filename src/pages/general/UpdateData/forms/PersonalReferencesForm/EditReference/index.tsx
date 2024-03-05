import { useState } from "react";
import { EditReferenceUI } from "./interface";
import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { IPersonalReferenceEntry } from "../types";

interface EditReferenceProps {
  reference: IEntry;
  formik: FormikValues;
}

const getEditReference = (
  reference: IPersonalReferenceEntry,
  formik: FormikValues,
) => {
  const referenceToEdit: IPersonalReferenceEntry = formik.values.entries.find(
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
      const updatedEntries: IPersonalReferenceEntry = formik.values.entries.map(
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
              stateOrDepartment: formik.values.stateOrDepartment,
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
      "stateOrDepartment",
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
