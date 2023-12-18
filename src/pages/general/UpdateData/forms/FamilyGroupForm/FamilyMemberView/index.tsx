import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { useState } from "react";
import { IFamilyGroupEntry } from "../types";
import { FamilyMemberViewUI } from "./interface";

const getFamilyMember = (member: IFamilyGroupEntry, formik: FormikValues) => {
  const memberToView: IFamilyGroupEntry = formik.values.entries.find(
    (entry: IFamilyGroupEntry) => entry.id === member.id
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
  formik: FormikValues;
  onDeleteMember: () => void;
  onEditMember: (member: IFamilyGroupEntry, formik: FormikValues) => void;
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
    onEditMember(member, formik);
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
