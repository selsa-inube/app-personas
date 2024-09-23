import { IEntry } from "@design/data/Table/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "../types";
import { FamilyMemberViewUI } from "./interface";

const getFamilyMember = (
  member: IFamilyGroupEntry,
  formik: FormikProps<IFamilyGroupEntries>,
) => {
  const memberToView = formik.values.entries.find(
    (entry: IFamilyGroupEntry) => entry.id === member.id,
  );

  if (memberToView) {
    formik.setValues({
      entries: formik.values.entries,
      ...memberToView,
    });
  }
};

interface FamilyMemberViewProps {
  member: IEntry;
  formik: FormikProps<IFamilyGroupEntries>;
  onDeleteMember: () => void;
  onEditMember: (member: IFamilyGroupEntry) => void;
  isRequired: (fieldName: string) => boolean;
}

function FamilyMemberView(props: FamilyMemberViewProps) {
  const { member, formik, onDeleteMember, onEditMember, isRequired } = props;

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalView = () => {
    setShowModal(true);
    getFamilyMember(member, formik);
  };

  const handleToggleDeleteModal = () => {
    setShowModal(!showModal);
    setShowDeleteModal(false);
  };

  const handleDeleteModal = () => {
    setShowModal(false);
    setShowDeleteModal(true);
  };

  const handleToggleEditModal = () => {
    setShowModal(!showModal);
    setShowEditModal(false);
  };

  const handleEditModal = () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleConfirm = () => {
    onEditMember(member);
    handleToggleEditModal();
  };

  return (
    <FamilyMemberViewUI
      showModal={showModal}
      formik={formik}
      member={member}
      showDeleteModal={showDeleteModal}
      showEditModal={showEditModal}
      onCloseModal={handleToggleModal}
      onShowModal={handleModalView}
      onDeleteModal={handleDeleteModal}
      onEditModal={handleEditModal}
      onDeleteMember={onDeleteMember}
      onConfirm={handleConfirm}
      onCloseDeleteModal={handleToggleDeleteModal}
      onCloseEditModal={handleToggleEditModal}
      isRequired={isRequired}
    />
  );
}

export { FamilyMemberView };
