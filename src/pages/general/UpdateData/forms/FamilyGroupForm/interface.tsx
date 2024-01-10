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

interface FamilyGroupFormUIProps {
  formik: FormikValues;
  message?: IMessage;
  familyGroupTableActions: IAction[];
  onCloseMessage: () => void;
}

function FamilyGroupFormUI(props: FamilyGroupFormUIProps) {
  const { formik, familyGroupTableActions, message, onCloseMessage } = props;
  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button iconBefore={<MdOutlinePersonAddAlt />} variant="none">
          Adicionar familiar
        </Button>
        <Table
          portalId="modals"
          titles={familyGroupTableTitles}
          breakpoints={familyGroupTableBreakpoints}
          actions={familyGroupTableActions}
          entries={mapFamilyGroupTable(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
      </Stack>
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
