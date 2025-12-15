import { useCallback, useState } from "react";
import { FamilyMemberCreateModal } from "@components/modals/general/updateData/FamilyGroupModals/FamilyMemberCreateModal";
import { inube } from "@design/tokens";
import { Button, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdPersonOutline } from "react-icons/md";
import { IContactDataEntry } from "./CreateFamilyMember/forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "./CreateFamilyMember/forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "./CreateFamilyMember/forms/InformationDataForm/types";
import { IPersonalDataEntry } from "./CreateFamilyMember/forms/PersonalDataForm/types";
import { IFamilyGroupEntries, IFamilyGroupEntry } from "./types";
import { UpdatesCard, UpdatesCardItem } from "@components/cards/UpdatesCard";
import { EModalActiveState } from "../../types";
import * as Yup from "yup";
import { DecisionModal } from "@components/modals/general/DecisionModal";
import { EditFamilyMemberModal } from "@components/modals/general/updateData/FamilyGroupModals/EditFamilyMemberModal";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";

interface FamilyGroupFormUIProps {
  formik: FormikProps<IFamilyGroupEntries>;
  isMobile: boolean;
  loading?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  showModal: EModalActiveState;
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
    isMobile,
    loading,
    validationSchema,
    onEditMember,
    onDeleteMember,
    showModal,
    setShowModal,
    onAddMember,
  } = props;

  const familyGroups = formik.values.entries;
  const [selectedMember, setSelectedMember] = useState<IFamilyGroupEntry | null>(null);

  const closeModal = useCallback(() => {
    setSelectedMember(null);
    setShowModal(EModalActiveState.IDLE);
  }, [setShowModal]);

  const items = familyGroups.map((member) => {
    const relationshipOption = relationshipDM.options.find(
      option => option.value === member.relationship
    );

    return {
      id: String(member.id),
      title: `${member.firstName} ${member.secondName || ''} ${member.firstLastName} ${member.secondLastName}`,
      entries: [
        { name: "Número de identificación", value: String(member.identificationNumber) || '' },
        { name: "Parentesco", value: relationshipOption ? relationshipOption.label : '' },
        { name: "Correo electrónico", value: member.email || '' },
        { name: "Celular", value: String(member.cellPhone) || '' }
      ]
    };
  });

  const handleDelete = (item: UpdatesCardItem) => {
    const foundMember = familyGroups.find(m => String(m.id) === item.id);
    if (foundMember) {
      setSelectedMember(foundMember);
      setShowModal(EModalActiveState.DELETE);
    }
  };

  const handleEdit = (item: UpdatesCardItem) => {
    const foundMember = familyGroups.find(m => String(m.id) === item.id);
    if (foundMember) {
      setSelectedMember(foundMember);
      formik.setValues({
        ...foundMember,
        entries: formik.values.entries,
      });
      setShowModal(EModalActiveState.EDIT);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s300 : inube.spacing.s400}
        width="100%"
      >
        {
          familyGroups.length === 0 ? (
            <Message
              appearance="help"
              title="Actualmente no tienes familiares relacionados. Haz clic en “Agregar familiar” para empezar."
            />
          ) : (
            <UpdatesCard
              isMobile={isMobile}
              loading={loading}
              icon={<MdPersonOutline />}
              items={items}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        }
        <Button
          appearance="primary"
          iconBefore={<MdAdd />}
          spacing="compact"
          variant="none"
          onClick={() => setShowModal(EModalActiveState.CREATE)}
          cursorHover
        >
          Adicionar familiar
        </Button>
        {showModal === EModalActiveState.CREATE && (
          <FamilyMemberCreateModal
            portalId="modals"
            onCloseModal={closeModal}
            onAddMember={onAddMember}
          />
        )}

        {showModal === EModalActiveState.EDIT && selectedMember && selectedMember.id && (
          <EditFamilyMemberModal
            portalId="modals"
            formik={formik}
            onCloseModal={closeModal}
            onConfirm={() => onEditMember(selectedMember)}
            validationSchema={validationSchema}
          />
        )}

        {showModal === EModalActiveState.DELETE && selectedMember && selectedMember.id && (
          <DecisionModal
            portalId="modals"
            title="Eliminar familiar"
            description={`¿Estás seguro que deseas eliminar a "${selectedMember?.firstName} ${selectedMember?.firstLastName}" como familiar?`}
            onCloseModal={closeModal}
            actionText="Eliminar"
            appearance="danger"
            onClick={() => {
              onDeleteMember(String(selectedMember.id));
              closeModal();
            }}
          />
        )}
      </Stack>
    </>
  );
}

export { FamilyGroupFormUI };
