import { IFamilyGroupEntries } from "./types";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { IAction } from "@design/data/Table/types";
import { Icon } from "@design/data/Icon";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FamilyGroupFormUI } from "./interface";
import { FamilyMemberView } from "./FamilyMemberView";

interface FamilyGroupFormProps {
  initialValues: IFamilyGroupEntries;
  onSubmit?: (values: IFamilyGroupEntries) => void;
}

const FamilyGroupForm = forwardRef(function FamilyGroupForm(
  props: FamilyGroupFormProps,
  ref: React.Ref<FormikProps<IFamilyGroupEntries>>
) {
  const { initialValues, onSubmit } = props;

  const [showFamilyMemberViewModal, setShowFamilyMemberViewModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: onSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowFamilyMemberViewModal(!showFamilyMemberViewModal);
  };

  const familygroupTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Ver",
      content: (member) => <FamilyMemberView member={member} formik={formik} />,
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Editar",
      content: (member) => (
        <Icon
          appearance="dark"
          icon={<MdOutlineModeEdit />}
          cursorHover={true}
          size="16px"
          spacing="none"
        />
      ),
      mobilePriority: true,
    },
    {
      id: "3",
      actionName: "Borrar",
      content: (member) => (
        <Icon
          appearance="dark"
          icon={<MdDeleteOutline />}
          cursorHover={true}
          size="16px"
          spacing="none"
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <FamilyGroupFormUI
      formik={formik}
      showFamilyMemberViewModal={showFamilyMemberViewModal}
      handleToggleModal={handleToggleModal}
      familygroupTableActions={familygroupTableActions}
    />
  );
});

export { FamilyGroupForm };
