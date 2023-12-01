import { ReferenceModal } from "@components/modals/forms/update-data/ReferenceModal";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { IMessage } from "@ptypes/messages.types";
import { FormikValues } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { mapPersonalReferences } from "../../config/mappers";
import {
  personalReferencesTableBreakpoints,
  personalReferencesTableTitles,
} from "./config/table";

interface PersonalReferencesFormUIProps {
  formik: FormikValues;
  showAddReferenceModal: boolean;
  handleToggleModal: () => void;
  handleAddReference: () => void;
  personalReferencesTableActions: IAction[];
  message: IMessage;
  onCloseMessage: () => void;
}

function PersonalReferencesFormUI(props: PersonalReferencesFormUIProps) {
  const {
    formik,
    showAddReferenceModal,
    handleToggleModal,
    handleAddReference,
    personalReferencesTableActions,
    message,
    onCloseMessage,
  } = props;
  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlinePersonAddAlt />}
          variant="none"
          onClick={handleToggleModal}
        >
          Adicionar referencia
        </Button>
        <Table
          id="modals"
          titles={personalReferencesTableTitles}
          breakpoints={personalReferencesTableBreakpoints}
          actions={personalReferencesTableActions}
          entries={mapPersonalReferences(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
      </Stack>
      {showAddReferenceModal && (
        <ReferenceModal
          title="Adicionar referencia"
          description="Agrega una referencia personal"
          confirmButtonText="Adicionar"
          portalId="modals"
          formik={formik}
          onCloseModal={handleToggleModal}
          onConfirm={handleAddReference}
        />
      )}
      {message.show && (
        <SectionMessage
          title={message.title}
          description={message.description}
          icon={message.icon}
          appearance={message.appearance}
          duration={3000}
          onClose={onCloseMessage}
        />
      )}
    </>
  );
}

export { PersonalReferencesFormUI };
