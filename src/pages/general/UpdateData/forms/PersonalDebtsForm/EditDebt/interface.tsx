import { Icon } from "@design/data/Icon";
import { MdOutlineModeEdit } from "react-icons/md";
import { DebtModal } from "@components/modals/forms/update-data/DebtModal";
import { FormikValues } from "formik";

interface EditDebtUIProps {
  showModal: boolean;
  formik: FormikValues;
  handleEditModal: () => void;
  handleEditDebt: () => void;
  closeModal: () => void;
}

function EditDebtUI(props: EditDebtUIProps) {
  const { showModal, formik, handleEditModal, handleEditDebt, closeModal } =
    props;

  return (
    <>
      <Icon
        appearance="dark"
        icon={<MdOutlineModeEdit />}
        cursorHover={true}
        size="16px"
        spacing="none"
        onClick={handleEditModal}
      />

      {showModal && (
        <DebtModal
          title="Editar deuda"
          description="Edita la información de tus deudas."
          confirmButtonText="Guardar"
          portalId="modals"
          formik={formik}
          onCloseModal={closeModal}
          onConfirm={handleEditDebt}
        />
      )}
    </>
  );
}

export { EditDebtUI };