import { FamilyMemberCreateModal } from "@components/modals/general/updateData/FamilyGroupModals/FamilyMemberCreateModal";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { usersMock } from "@mocks/users/users.mocks";
import { IMessage } from "@ptypes/messages.types";
import { FormikValues } from "formik";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { mapFamilyGroups } from "../../config/mappers";
import { IContactDataEntry } from "./CreateFamilyMember/forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "./CreateFamilyMember/forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "./CreateFamilyMember/forms/InformationDataForm/types";
import { IPersonalDataEntry } from "./CreateFamilyMember/forms/PersonalDataForm/types";
import { mapFamilyGroupTable } from "./config/mapper";
import {
  familyGroupTableBreakpoints,
  familyGroupTableTitles,
} from "./config/table";

interface FamilyGroupFormUIProps {
  formik: FormikValues;
  showAddMemberModal: boolean;
  loading?: boolean;
  withSubmit?: boolean;
  message?: IMessage;
  familyGroupTableActions: IAction[];
  onCloseMessage: () => void;
  onToggleModal: () => void;
  onAddMember: (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    InformationData: IInformationDataEntry,
  ) => void;
}

function FamilyGroupFormUI(props: FamilyGroupFormUIProps) {
  const {
    formik,
    showAddMemberModal,
    familyGroupTableActions,
    loading,
    withSubmit,
    message,
    onToggleModal,
    onAddMember,
    onCloseMessage,
  } = props;

  const validateButtonActivation =
    JSON.stringify(mapFamilyGroups(usersMock[0].familyGroup || [])) ===
    JSON.stringify(formik.values.entries);

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
          portalId="modals"
          titles={familyGroupTableTitles}
          breakpoints={familyGroupTableBreakpoints}
          actions={familyGroupTableActions}
          entries={mapFamilyGroupTable(formik.values.entries)}
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
              disabled={loading || validateButtonActivation}
            >
              Guardar
            </Button>
          </Stack>
        )}
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
