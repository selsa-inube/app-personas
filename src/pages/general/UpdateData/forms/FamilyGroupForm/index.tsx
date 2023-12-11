import { IAction } from "@design/data/Table/types";
import { EMessageType, IMessage } from "@ptypes/messages.types";
import { FormikProps, FormikValues, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { EditFamilyMember } from "./EditFamilyMember";
import { DeleteFamilyMember } from "./DeleteFamilyMember";
import { FamilyMemberView } from "./FamilyMemberView";
import { deleteFamilyMemberMsgs } from "./config/deleteMember";
import { FamilyGroupFormUI } from "./interface";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "./types";

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

  const handleEditMember = async (
    member: IFamilyGroupEntry,
    formik: FormikValues
  ) => {
    await formik.validateForm();

    if (formik.isValid) {
      const updatedEntries = formik.values.entries.map(
        (entry: IFamilyGroupEntry) => {
          if (entry.id === member.id) {
            return {
              id: formik.values.id,
              firstName: formik.values.firstName,
              secondName: formik.values.secondName,
              firstLastName: formik.values.firstLastName,
              secondLastName: formik.values.secondLastName,
              type: formik.values.type,
              number: formik.values.number,
              city: formik.values.city,
              date: formik.values.date,
              country: formik.values.country,
              address: formik.values.address,
              department: formik.values.department,
              zipCode: formik.values.zipCode,
              landlinePhone: formik.values.landlinePhone,
              cellPhone: formik.values.cellPhone,
              email: formik.values.email,
              birthDate: formik.values.birthDate,
              gender: formik.values.gender,
              relationship: formik.values.relationship,
              isDependent: formik.values.isDependent,
              educationLevel: formik.values.educationLevel,
              businessActivity: formik.values.businessActivity,
              profession: formik.values.profession,
            };
          }
          return entry;
        }
      );

      formik.setFieldValue("entries", updatedEntries);
    }
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
          onEditMember={handleEditMember}
        />
      ),
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Editar",
      content: (member) => (
        <EditFamilyMember
          formik={formik}
          member={member}
          onEditMember={handleEditMember}
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
