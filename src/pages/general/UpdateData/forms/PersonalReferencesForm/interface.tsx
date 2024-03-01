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
  personalReferencesTableActions: IAction[];
  loading?: boolean;
  withSubmit?: boolean;
  message: IMessage;
  onCloseMessage: () => void;
  onToggleModal: () => void;
  onAddReference: () => void;
}

function PersonalReferencesFormUI(props: PersonalReferencesFormUIProps) {
  const {
    formik,
    showAddReferenceModal,
    personalReferencesTableActions,
    loading,
    withSubmit,
    message,
    onCloseMessage,
    onToggleModal,
    onAddReference,
  } = props;

  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlinePersonAddAlt />}
          variant="none"
          onClick={onToggleModal}
        >
          Adicionar referencia
        </Button>
        <Table
          portalId="modals"
          titles={personalReferencesTableTitles}
          breakpoints={personalReferencesTableBreakpoints}
          actions={personalReferencesTableActions}
          entries={mapPersonalReferences(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
        {withSubmit && (
          <Stack gap="s150" justifyContent="flex-end">
            <Button
              onClick={formik.handleReset}
              type="button"
              disabled={loading || !formik.dirty}
              spacing="compact"
              variant="outlined"
              appearance="gray"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              spacing="compact"
              disabled={
                loading || !formik.dirty || formik.values.entries.length === 0
              }
            >
              Guardar
            </Button>
          </Stack>
        )}
      </Stack>
      {showAddReferenceModal && (
        <ReferenceModal
          title="Adicionar referencia"
          description="Agrega una referencia personal"
          confirmButtonText="Adicionar"
          portalId="modals"
          formik={formik}
          onCloseModal={onToggleModal}
          onConfirm={onAddReference}
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
