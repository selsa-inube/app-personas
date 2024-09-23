import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { IFamilyGroupEntry } from "../types";
import { EditFamilyMemberUI } from "./interface";

const getEditFamilyMember = (
  member: IFamilyGroupEntry,
  formik: FormikValues,
) => {
  const memberToEdit: IFamilyGroupEntry = formik.values.entries.find(
    (entry: IFamilyGroupEntry) => entry.id === member.id,
  );

  if (memberToEdit) {
    formik.setValues({
      entries: formik.values.entries,
      ...memberToEdit,
    });
  }
};

interface EditFamilyMemberProps {
  member: IEntry;
  formik: FormikValues;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onEditMember: (member: IFamilyGroupEntry, formik: FormikValues) => void;
}

function EditFamilyMember(props: EditFamilyMemberProps) {
  const { member, formik, validationSchema, onEditMember } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditModal = () => {
    setShowModal(true);
    getEditFamilyMember(member, formik);
  };

  const handleConfirm = () => {
    onEditMember(member, formik);
    handleToggleModal();
  };

  return (
    <EditFamilyMemberUI
      formik={formik}
      showModal={showModal}
      validationSchema={validationSchema}
      onEditModal={handleEditModal}
      onConfirm={handleConfirm}
      onCloseModal={handleToggleModal}
    />
  );
}

export { EditFamilyMember };
