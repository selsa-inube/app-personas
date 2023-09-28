import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlineAccountBalance } from "react-icons/md";
import {
  personalDebtsTableActions,
  personalDebtsTableBreakpoints,
  personalDebtsTableTitles,
} from "./config/table";
import { AddDebtModal } from "@components/modals/forms/update-data/AddDebtModal";

interface PersonalDebtsFormUIProps {
  formik: FormikValues;
  showAddDebtModal: boolean;
  handleToggleModal: () => void;
}

function PersonalDebtsFormUI(props: PersonalDebtsFormUIProps) {
  const { formik, showAddDebtModal, handleToggleModal } = props;
  return (
    <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
      <Button
        iconBefore={<MdOutlineAccountBalance />}
        variant="none"
        handleClick={handleToggleModal}
      >
        Adicionar deuda
      </Button>
      <Table
        id="modals"
        titles={personalDebtsTableTitles}
        breakpoints={personalDebtsTableBreakpoints}
        actions={personalDebtsTableActions}
        entries={formik.values.entries}
        pageLength={formik.values.entries.length}
        hideMobileResume
      />
      {showAddDebtModal && (
        <AddDebtModal
          portalId="modals"
          formik={formik}
          onCloseModal={handleToggleModal}
        />
      )}
    </Stack>
  );
}

export { PersonalDebtsFormUI };
