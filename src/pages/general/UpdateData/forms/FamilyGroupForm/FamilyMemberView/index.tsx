import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { useState } from "react";
import { IFamilyGroupEntry } from "../types";
import { FamilyMemberViewUI } from "./interface";

interface FamilyMemberViewProps {
  member: IEntry;
  formik: FormikValues;
  onDeleteMember: () => void;
}

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

function FamilyMemberView(props: FamilyMemberViewProps) {
  const { member, formik, onDeleteMember } = props;

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalView = () => {
    setShowModal(true);
    getFamilyMember(member, formik);
  };

  const handleToggleDeleteModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteModal = () => {
    setShowModal(false);
    setShowDeleteModal(true);
  };

  return (
    <FamilyMemberViewUI
      showModal={showModal}
      formik={formik}
      member={member}
      showDeleteModal={showDeleteModal}
      onCloseModal={handleToggleModal}
      onShowModal={handleModalView}
      onDeleteModal={handleDeleteModal}
      onDeleteMember={onDeleteMember}
      onCloseDeleteModal={handleToggleDeleteModal}
    />
  );
}

export { FamilyMemberView };
