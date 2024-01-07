import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { IMessage } from "@ptypes/messages.types";
import { FormikValues } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { mapFamilyGroupTable } from "./config/mapper";
import {
  familyGroupTableBreakpoints,
  familyGroupTableTitles,
} from "./config/table";
import { IIdentificationDataEntry } from "./AddFamilyMember/forms/IdentificationDataForm/types";
import { FamilyMemberCreateModal } from "@components/modals/forms/update-data/FamilyGroupModals/FamilyMemberCreateModal";

interface FamilyGroupFormUIProps {
  formik: FormikValues;
  showAddMemberModal: boolean;
  message?: IMessage;
  familyGroupTableActions: IAction[];
  onCloseMessage: () => void;
  onToggleModal: () => void;
  onAddMember: (identification: IIdentificationDataEntry) => void;
}

function FamilyGroupFormUI(props: FamilyGroupFormUIProps) {
  const {
    formik,
    showAddMemberModal,
    familyGroupTableActions,
    message,
    onToggleModal,
    onAddMember,
    onCloseMessage,
  } = props;
  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlinePersonAddAlt />}
          variant="none"
          onClick={onToggleModal}
        >
          Adicionar familiar
        </Button>
        <Table
          id="modals"
          titles={familyGroupTableTitles}
          breakpoints={familyGroupTableBreakpoints}
          actions={familyGroupTableActions}
          entries={mapFamilyGroupTable(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
      </Stack>
      {showAddMemberModal && (
        <FamilyMemberCreateModal
          portalId="modals"
          onCloseModal={onToggleModal}
          onAddMember={onAddMember}
        />
      )}
      {message && message.show && (
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

export { FamilyGroupFormUI };
