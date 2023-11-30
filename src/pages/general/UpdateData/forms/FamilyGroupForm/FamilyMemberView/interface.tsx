import { Icon } from "@design/data/Icon";
import { FamilyMemberViewModal } from "@components/modals/forms/update-data/FamilyGroupModals/FamilyMemberViewModal";
import { FormikValues } from "formik";
import { MdOpenInNew } from "react-icons/md";

interface FamilyMemberViewUIProps {
  showModal: boolean;
  formik: FormikValues;
  onCloseModal: () => void;
  onShowModal: () => void;
}

function FamilyMemberViewUI(props: FamilyMemberViewUIProps) {
  const { showModal, formik, onCloseModal, onShowModal } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOpenInNew />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={onShowModal}
      />

      {showModal && (
        <FamilyMemberViewModal
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export { FamilyMemberViewUI };
