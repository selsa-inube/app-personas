import { ReferenceModal } from "@components/modals/general/updateData/ReferenceModal";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import { Button, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { mapPersonalReferences } from "../../config/mappers";
import {
  personalReferencesTableBreakpoints,
  personalReferencesTableTitles,
} from "./config/table";
import { IPersonalReferenceEntries } from "./types";

interface PersonalReferencesFormUIProps {
  formik: FormikProps<IPersonalReferenceEntries>;
  showAddReferenceModal: boolean;
  personalReferencesTableActions: IAction[];
  loading?: boolean;
  withSubmit?: boolean;
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
    onToggleModal,
    onAddReference,
  } = props;

  return (
    <>
      <Stack
        direction="column"
        gap={inube.spacing.s300}
        alignItems="flex-end"
        width="100%"
      >
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
          <Stack gap={inube.spacing.s150} justifyContent="flex-end">
            <Button
              onClick={() => formik.handleReset()}
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
                loading ||
                !formik.dirty ||
                formik.values.entries.length ===
                  formik.initialValues.entries.length
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
    </>
  );
}

export { PersonalReferencesFormUI };
