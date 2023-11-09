import { DebtModal } from "@components/modals/forms/update-data/DebtModal";
import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlineAccountBalance } from "react-icons/md";
import { mapPersonalDebts } from "../../config/mappers";
import { IAction } from "@design/data/Table/types";
import {
  personalDebtsTableBreakpoints,
  personalDebtsTableTitles,
} from "./config/table";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { IMessage } from "@ptypes/messages.types";

interface PersonalDebtsFormUIProps {
  formik: FormikValues;
  showAddDebtModal: boolean;
  handleToggleModal: () => void;
  handleAddDebt: () => void;
  personalDebtsTableActions: IAction[];
  message: IMessage;
  onCloseMessage: () => void;
}

function PersonalDebtsFormUI(props: PersonalDebtsFormUIProps) {
  const {
    formik,
    showAddDebtModal,
    handleToggleModal,
    handleAddDebt,
    personalDebtsTableActions,
    message,
    onCloseMessage,
  } = props;

  return (
    <>
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
          entries={mapPersonalDebts(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
        />
        {showAddDebtModal && (
          <DebtModal
            title="Adicionar deuda"
            description="Agrega una deuda a la actualización"
            confirmButtonText="Adicionar"
            portalId="modals"
            formik={formik}
            onCloseModal={handleToggleModal}
            onConfirm={handleAddDebt}
          />
        )}
      </Stack>
      {message.show && (
        <SectionMessage
          title={message.title}
          description={message.description}
          icon={message.icon}
          appearance={message.appearance}
          duration={1500}
          closeSectionMessage={onCloseMessage}
          isMessageResponsive
        />
      )}
    </>
  );
}

export { PersonalDebtsFormUI };
