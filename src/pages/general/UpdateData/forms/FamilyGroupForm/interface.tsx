import { IUpdatesCardItem, UpdatesCard } from "@components/cards/UpdatesCard";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { FamilyMemberCreateModal } from "@components/modals/general/updateData/FamilyGroupModals/FamilyMemberCreateModal";
import { inube } from "@design/tokens";
import { Button, Message, Stack, useMediaQuery } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import { MdAdd, MdPersonOutline } from "react-icons/md";
import * as Yup from "yup";
import { EModalActiveState } from "../../types";
import { IContactDataEntry } from "./CreateFamilyMember/forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "./CreateFamilyMember/forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "./CreateFamilyMember/forms/InformationDataForm/types";
import { IPersonalDataEntry } from "./CreateFamilyMember/forms/PersonalDataForm/types";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "./types";

interface FamilyGroupFormUIProps {
  formik: FormikProps<IFamilyGroupEntries>;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  showModal: EModalActiveState;
  selectedMember?: IFamilyGroupEntry;
  itemsUpdatesCard: IUpdatesCardItem[];
  setSelectedMember: Dispatch<SetStateAction<IFamilyGroupEntry | undefined>>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  setShowModal: (state: EModalActiveState) => void;
  onAddMember: (
    identificationData: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    InformationData: IInformationDataEntry,
  ) => void;
  onEditMember: (member: IFamilyGroupEntry) => void;
  onDeleteMember: (memberId: string) => void;
}

function FamilyGroupFormUI(props: FamilyGroupFormUIProps) {
  const {
    formik,
    loading,
    validationSchema,
    showModal,
    selectedMember,
    itemsUpdatesCard,
    setSelectedMember,
    onDelete,
    onEdit,
    onEditMember,
    onDeleteMember,
    setShowModal,
    onAddMember,
  } = props;

  const isMobile = useMediaQuery("(max-width: 740px)");

  const closeModal = () => {
    setSelectedMember(undefined);
    setShowModal(EModalActiveState.IDLE);
  };

  const onDeleteClick = () => {
    onDeleteMember(String(selectedMember?.id));
    closeModal();
  };

  return (
    <>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
        width="100%"
      >
        {formik.values.entries.length === 0 ? (
          <Message
            appearance="help"
            title="Actualmente no tienes familiares relacionados. Haz clic en “Agregar familiar” para empezar."
          />
        ) : (
          <UpdatesCard
            id=""
            isMobile={isMobile}
            loading={loading}
            icon={<MdPersonOutline />}
            items={itemsUpdatesCard}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        <Stack
          gap={inube.spacing.s100}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            appearance="primary"
            iconBefore={<MdAdd />}
            spacing="compact"
            variant="none"
            onClick={() => setShowModal(EModalActiveState.CREATE)}
            cursorHover
          >
            Agregar familiar
          </Button>
        </Stack>
        {showModal === EModalActiveState.CREATE && (
          <FamilyMemberCreateModal
            portalId="modals"
            onCloseModal={closeModal}
            onAddMember={onAddMember}
          />
        )}

        {showModal === EModalActiveState.EDIT &&
          selectedMember &&
          selectedMember.id && (
            <EditFamilyMemberModal
              portalId="modals"
              formik={formik}
              onCloseModal={closeModal}
              onConfirm={() => onEditMember(selectedMember)}
              validationSchema={validationSchema}
            />
          )}

        {showModal === EModalActiveState.DELETE &&
          selectedMember &&
          selectedMember.id && (
            <DecisionModal
              portalId="modals"
              title="Eliminar familiar"
              description={`¿Estás seguro que deseas eliminar a "${selectedMember?.firstName} ${selectedMember?.firstLastName}" como familiar?`}
              onCloseModal={closeModal}
              actionText="Eliminar"
              appearance="danger"
              onClick={onDeleteClick}
            />
          )}
      </Stack>
    </>
  );
}

export { FamilyGroupFormUI };
