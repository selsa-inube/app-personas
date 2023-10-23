import { AddReferenceModal } from "@components/modals/forms/update-data/AddReferenceModal";
import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { mapPersonalReferences } from "../../config/mappers";
import {
  personalReferencesTableActions,
  personalReferencesTableBreakpoints,
  personalReferencesTableTitles,
} from "./config/table";

interface PersonalReferencesFormUIProps {
  formik: FormikValues;
  showAddReferenceModal: boolean;
  handleToggleModal: () => void;
  handleAddReference: () => void;
}

function PersonalReferencesFormUI(props: PersonalReferencesFormUIProps) {
  const {
    formik,
    showAddReferenceModal,
    handleToggleModal,
    handleAddReference,
  } = props;
  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlinePersonAddAlt />}
          variant="none"
          handleClick={handleToggleModal}
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
        <AddReferenceModal
          portalId="modals"
          formik={formik}
          onCloseModal={handleToggleModal}
          onAddReference={handleAddReference}
        />
      )}
    </>
  );
}

export { PersonalReferencesFormUI };
