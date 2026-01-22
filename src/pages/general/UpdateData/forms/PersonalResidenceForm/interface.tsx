import { UpdatesCard } from "@components/cards/UpdatesCard";
import { PersonalResidenceModal } from "@components/modals/general/updateData/PersonalResidenceModal";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Button, Message, Stack } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdAdd, MdOutlineHouse } from "react-icons/md";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import { residenceTypeDM } from "src/model/domains/general/updateData/personalResidence/residencetypedm";
import { IPersonalResidenceEntry } from "./types";
import { IResidenceTypeEntry } from "./CreatePersonalResidence/forms/ResidenceTypeForm/types";
import { IResidenceDetailsEntry } from "./CreatePersonalResidence/forms/ResidenceDetailsForm/types";
import { stratumDM } from "src/model/domains/general/updateData/personalResidence/stratumdm";

interface PersonalResidenceFormUIProps {
  formik: FormikProps<IPersonalResidenceEntry>;
  loading?: boolean;
  showModal: boolean;
  haveResidence: boolean;
  onToggleModal: () => void;
  onSavePersonalResidence: (residenceType: IResidenceTypeEntry, residenceDetails: IResidenceDetailsEntry) => void;
  onDeletePersonalResidence: () => void;
}

function PersonalResidenceFormUI(props: PersonalResidenceFormUIProps) {
  const {
    formik,
    loading,
    showModal,
    haveResidence,
    onToggleModal,
    onSavePersonalResidence,
    onDeletePersonalResidence,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");

  const getResidenceEntries = () => {
    const stratumLabel = stratumDM.valueOf(formik.values.stratum)?.value || formik.values.stratum || "";
    const entries = [{ name: "Estrato", value: stratumLabel }];

    if (formik.values.type === "rent") {
      entries.push(
        { name: "Nombre del arrendador", value: formik.values.landlordName || "" },
        { name: "Celular del arrendador", value: formik.values.landlordPhone || "" }
      );
    }

    if (formik.values.type === "familiar") {
      const relationshipLabel = relationshipDM.valueOf(formik.values.relationship)?.value || formik.values.relationship;
      entries.push(
        { name: "Nombre del titular", value: formik.values.ownerName || "" },
        { name: "Parentesco", value: relationshipLabel || "" },
        { name: "Celular del titular", value: formik.values.ownerPhone || "" }
      );
    }

    if (formik.values.type === "other") {
      entries.push(
        { name: "Tipo de vivienda", value: formik.values.otherType || "" }
      );
    }

    if (formik.values.type === "ownWithMortgage") {
      entries.push(
        { name: "Entidad bancaria", value: formik.values.bankEntityName || "" },
        { name: "Fecha de terminación", value: formik.values.dueDate || "" }
      );
    }

    return entries;
  };

  const getResidenceTypeLabel = () => {
    return residenceTypeDM.valueOf(formik.values.type)?.value || formik.values.type || "Tipo de residencia";
  };

  return (
    <form>
      <Stack direction="column" gap={inube.spacing.s200}>
        {!haveResidence ? (
          <Message
            appearance="help"
            title="Actualmente no tienes una residencial personal para mostrar. Para empezar haz clic en “Agregar residencia”"
          />
        ) : (
          <UpdatesCard
            id="residence"
            isMobile={isMobile}
            loading={loading}
            icon={<MdOutlineHouse />}
            items={[
              {
                title: getResidenceTypeLabel(),
                entries: getResidenceEntries(),
              },
            ]}
            deleteTitle="Eliminar residencia"
            deleteDescription={`¿Deseas eliminar "${getResidenceTypeLabel()}" como residencia?`}
            onDelete={onDeletePersonalResidence}
          />
        )}

        {showModal && (
          <PersonalResidenceModal
            portalId="modals"
            onCloseModal={onToggleModal}
            onAddResidence={(residenceType, residenceDetails) => {
              onSavePersonalResidence(residenceType, residenceDetails);
            }}
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
            onClick={!haveResidence ? onToggleModal : undefined}
            cursorHover={!haveResidence}
            disabled={haveResidence}
          >
            Agregar residencia
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export { PersonalResidenceFormUI };
