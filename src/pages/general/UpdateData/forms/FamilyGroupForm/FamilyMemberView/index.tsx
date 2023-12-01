import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { useState } from "react";
import { FamilyMemberViewUI } from "./interface";
import { IFamilyGroupEntry } from "../types";

interface FamilyMemberViewProps {
  member: IEntry;
  formik: FormikValues;
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
  const { member, formik } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalView = () => {
    setShowModal(true);
    getFamilyMember(member, formik);
  };

  return (
    <FamilyMemberViewUI
      showModal={showModal}
      formik={formik}
      onCloseModal={handleToggleModal}
      onShowModal={handleModalView}
    />
  );
}

export { FamilyMemberView };
