import { IEntry } from "@design/data/Table/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "../types";
import { EditFamilyMemberUI } from "./interface";

const getEditFamilyMember = (
  member: IFamilyGroupEntry,
  formik: FormikProps<IFamilyGroupEntries>,
) => {
  const memberToEdit = formik.values.entries.find(
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
  formik: FormikProps<IFamilyGroupEntries>;
  onEditMember: (member: IFamilyGroupEntry) => void;
  isRequired: (fieldName: string) => boolean;
}

function EditFamilyMember(props: EditFamilyMemberProps) {
  const { member, formik, onEditMember, isRequired } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditModal = () => {
    setShowModal(true);
    getEditFamilyMember(member, formik);
  };

  const handleConfirm = () => {
    onEditMember(member);
    handleToggleModal();
  };

  return (
    <EditFamilyMemberUI
      formik={formik}
      showModal={showModal}
      onEditModal={handleEditModal}
      onConfirm={handleConfirm}
      onCloseModal={handleToggleModal}
      isRequired={isRequired}
    />
  );
}

export { EditFamilyMember };
