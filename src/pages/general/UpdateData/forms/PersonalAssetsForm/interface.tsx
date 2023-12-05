import { AssetModal } from "@components/modals/forms/update-data/AssetModal";
import { Table } from "@design/data/Table";
import { IAction } from "@design/data/Table/types";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { IMessage } from "@ptypes/messages.types";
import { FormikValues } from "formik";
import { MdOutlineAddHome } from "react-icons/md";
import { mapPersonalAssets } from "../../config/mappers";
import {
  personalAssetsTableBreakpoints,
  personalAssetsTableTitles,
} from "./config/table";

interface PersonalAssetsFormUIProps {
  formik: FormikValues;
  showAddAssetModal: boolean;
  personalAssetsTableActions: IAction[];
  message: IMessage;
  onCloseMessage: () => void;
  onToggleModal: () => void;
  onAddAsset: () => void;
}

function PersonalAssetsFormUI(props: PersonalAssetsFormUIProps) {
  const {
    formik,
    showAddAssetModal,
    personalAssetsTableActions,
    message,
    onCloseMessage,
    onToggleModal,
    onAddAsset,
  } = props;

  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlineAddHome />}
          variant="none"
          onClick={onToggleModal}
        >
          Adicionar bien
        </Button>
        <Table
          id="modals"
          titles={personalAssetsTableTitles}
          breakpoints={personalAssetsTableBreakpoints}
          actions={personalAssetsTableActions}
          entries={mapPersonalAssets(formik.values.entries)}
          pageLength={formik.values.entries.length}
          hideMobileResume
          colsSameWidth
        />
        {showAddAssetModal && (
          <AssetModal
            title="Adicionar bien"
            description="Agrega un bien a la actualización de datos."
            confirmButtonText="Adicionar"
            portalId="modals"
            formik={formik}
            onCloseModal={onToggleModal}
            onConfirm={onAddAsset}
          />
        )}
      </Stack>
      {message.show && (
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

export { PersonalAssetsFormUI };
