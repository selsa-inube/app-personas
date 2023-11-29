import { Icon } from "@design/data/Icon";
import { FamilyMemberViewModal } from "@components/modals/forms/update-data/FamilyGroupModals/FamilyMemberViewModal";
import { FormikValues } from "formik";
import { MdOpenInNew } from "react-icons/md";

interface FamilyMemberViewUIProps {
  showModal: boolean;
  formik: FormikValues;
  onCloseModal: () => void;
  handleModalView: () => void;
}

function FamilyMemberViewUI(props: FamilyMemberViewUIProps) {
  const { showModal, formik, onCloseModal, handleModalView } = props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOpenInNew />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={handleModalView}
      />

      {showModal && (
        <FamilyMemberViewModal
          title="Ver familiar"
          description="Detalles de la información."
          portalId="modals"
          formik={formik}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export { FamilyMemberViewUI };
