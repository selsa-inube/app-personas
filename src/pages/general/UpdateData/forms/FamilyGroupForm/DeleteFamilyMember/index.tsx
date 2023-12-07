import { IEntry } from "@design/data/Table/types";
import { useState } from "react";
import { DeleteFamilyMemberUI } from "./interface";

interface DeleteFamilyMemberProps {
  member: IEntry;
  onDeleteMember: () => void;
}

function DeleteFamilyMember(props: DeleteFamilyMemberProps) {
  const { member, onDeleteMember } = props;

  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <DeleteFamilyMemberUI
      member={member}
      showModal={showModal}
      onShowModal={handleToggleModal}
      onDeleteMember={onDeleteMember}
      onCloseModal={handleToggleModal}
    />
  );
}

export { DeleteFamilyMember };
