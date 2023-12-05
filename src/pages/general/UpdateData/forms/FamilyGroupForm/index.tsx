import { Icon } from "@design/data/Icon";
import { IAction } from "@design/data/Table/types";
import { EMessageType, IMessage } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

import { DeleteFamilyMember } from "./DeleteFamilyMember";
import { FamilyMemberView } from "./FamilyMemberView";
import { deleteFamilyMemberMsgs } from "./config/deleteMember";
import { FamilyGroupFormUI } from "./interface";
import { IFamilyGroupEntries } from "./types";

interface FamilyGroupFormProps {
  initialValues: IFamilyGroupEntries;
  onSubmit?: (values: IFamilyGroupEntries) => void;
}

const FamilyGroupForm = forwardRef(function FamilyGroupForm(
  props: FamilyGroupFormProps,
  ref: React.Ref<FormikProps<IFamilyGroupEntries>>
) {
  const { initialValues, onSubmit } = props;

  const [message, setMessage] = useState<IMessage>();

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleShowMessage = (message: IMessage) => {
    const { title, description, icon, appearance } = message;
    setMessage({
      show: true,
      title,
      description,
      icon,
      appearance,
    });
  };

  const handleCloseMessage = () => {
    setMessage(undefined);
  };

  const handleDeleteMember = (memberId: string) => {
    let messageType = EMessageType.SUCCESS;

    const member = formik.values.entries.find((entry) => entry.id === memberId);

    const updatedMembers = formik.values.entries.filter(
      (member) => member.id !== memberId
    );

    if (updatedMembers.length === formik.values.entries.length) {
      messageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedMembers);
    }

    const { icon, title, description, appearance } =
      deleteFamilyMemberMsgs[messageType];

    handleShowMessage({
      title,
      description: description(`${member?.firstName} ${member?.firstLastName}`),
      icon,
      appearance,
    });
  };

  const familyGroupTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Ver",
      content: (member) => (
        <FamilyMemberView
          member={member}
          formik={formik}
          onDeleteMember={() => handleDeleteMember(member.id)}
        />
      ),
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Editar",
      content: (member) => (
        <Icon
          appearance="dark"
          icon={<MdOutlineModeEdit />}
          size="16px"
          spacing="none"
          cursorHover
        />
      ),
      mobilePriority: true,
    },
    {
      id: "3",
      actionName: "Borrar",
      content: (member) => (
        <DeleteFamilyMember
          member={member}
          onDeleteMember={() => handleDeleteMember(member.id)}
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <FamilyGroupFormUI
      formik={formik}
      familyGroupTableActions={familyGroupTableActions}
      message={message}
      onCloseMessage={handleCloseMessage}
    />
  );
});

export { FamilyGroupForm };
