import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import {
  familyGroupTableBreakpoints,
  familyGroupTableTitles,
} from "./config/table";

interface FamilyGroupFormUIProps {
  formik: FormikValues;
  showFamilyMemberViewModal: boolean;
  handleToggleModal: () => void;
  familygroupTableActions: IAction[];
}

function FamilyGroupFormUI(props: FamilyGroupFormUIProps) {
  const {
    formik,
    familygroupTableActions,
  } = props;
  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlinePersonAddAlt />}
          variant="none"
        >
          Adicionar familiar
        </Button>
        <Table
          id="modals"
          titles={familyGroupTableTitles}
          breakpoints={familyGroupTableBreakpoints}
          actions={familygroupTableActions}
          entries={formik.values.entries}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
      </Stack>
    </>
  );
}

export { FamilyGroupFormUI };
