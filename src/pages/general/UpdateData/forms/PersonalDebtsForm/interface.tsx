import { DebtModal } from "@components/modals/general/updateData/DebtModal";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { inube } from "@design/tokens";
import { Stack } from "@inubekit/stack";
import { FormikProps } from "formik";
import { MdOutlineAccountBalance } from "react-icons/md";
import { mapPersonalDebts } from "../../config/mappers";
import {
  personalDebtsTableBreakpoints,
  personalDebtsTableTitles,
} from "./config/table";
import { IPersonalDebtEntries } from "./types";
import { Button } from "@inubekit/button";

interface PersonalDebtsFormUIProps {
  formik: FormikProps<IPersonalDebtEntries>;
  showAddDebtModal: boolean;
  personalDebtsTableActions: IAction[];
  loading?: boolean;
  withSubmit?: boolean;
  onAddDebt: () => void;
  onToggleModal: () => void;
}

function PersonalDebtsFormUI(props: PersonalDebtsFormUIProps) {
  const {
    formik,
    showAddDebtModal,
    personalDebtsTableActions,
    loading,
    withSubmit,
    onToggleModal,
    onAddDebt,
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
          iconBefore={<MdOutlineAccountBalance />}
          variant="none"
          onClick={onToggleModal}
        >
          Adicionar deuda
        </Button>
        <Table
          portalId="modals"
          titles={personalDebtsTableTitles}
          breakpoints={personalDebtsTableBreakpoints}
          actions={personalDebtsTableActions}
          entries={mapPersonalDebts(formik.values.entries)}
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
                !formik.isValid ||
                formik.values.entries.length ===
                  formik.initialValues.entries.length
              }
            >
              Guardar
            </Button>
          </Stack>
        )}
        {showAddDebtModal && (
          <DebtModal
            title="Adicionar deuda"
            description="Agrega una deuda a la actualización"
            confirmButtonText="Adicionar"
            portalId="modals"
            formik={formik}
            onCloseModal={onToggleModal}
            onConfirm={onAddDebt}
          />
        )}
      </Stack>
    </>
  );
}

export { PersonalDebtsFormUI };
