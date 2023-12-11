import { useState } from "react";
import { EditFamilyMemberUI } from "./interface";
import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { IFamilyGroupEntry } from "../types";

interface EditFamilyMemberProps {
  member: IEntry;
  formik: FormikValues;
  onEditMember: (member: IFamilyGroupEntry, formik: FormikValues) => void;
}

const getEditFamilyMember = (
  member: IFamilyGroupEntry,
  formik: FormikValues
) => {
  const memberToEdit: IFamilyGroupEntry = formik.values.entries.find(
    (entry: IFamilyGroupEntry) => entry.id === member.id
  );

  if (memberToEdit) {
    formik.setValues({
      entries: formik.values.entries,
      ...memberToEdit,
    });
  }
};

function EditFamilyMember(props: EditFamilyMemberProps) {
  const { member, formik, onEditMember } = props;

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
      onEditModal={handleEditModal}
      onConfirm={handleConfirm}
      closeModal={handleToggleModal}
    />
  );
}

export { EditFamilyMember };
