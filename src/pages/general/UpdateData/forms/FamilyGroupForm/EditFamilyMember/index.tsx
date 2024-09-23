import { IEntry } from "@design/data/Table/types";
import { FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
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
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onEditMember: (member: IFamilyGroupEntry) => void;
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
    onEditMember(member);
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
