import { AssetModal } from "@components/modals/forms/update-data/AssetModal";
import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlineAddHome } from "react-icons/md";
import { mapPersonalAssets } from "../../config/mappers";
import { IAction } from "@design/data/Table/types";
import {
  personalAssetsTableBreakpoints,
  personalAssetsTableTitles,
} from "./config/table";
import { SectionMessage } from "@design/feedback/SectionMessage";
import { IMessage } from "@ptypes/messages.types";

interface PersonalAssetsFormUIProps {
  formik: FormikValues;
  showAddAssetModal: boolean;
  handleToggleModal: () => void;
  handleAddAsset: () => void;
  personalAssetsTableActions: IAction[];
  message: IMessage;
  onCloseMessage: () => void;
}

function PersonalAssetsFormUI(props: PersonalAssetsFormUIProps) {
  const {
    formik,
    showAddAssetModal,
    handleToggleModal,
    handleAddAsset,
    personalAssetsTableActions,
    message,
    onCloseMessage,
  } = props;

  return (
    <>
      <Stack direction="column" gap="s300" alignItems="flex-end" width="100%">
        <Button
          iconBefore={<MdOutlineAddHome />}
          variant="none"
          handleClick={handleToggleModal}
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
        />
        {showAddAssetModal && (
          <AssetModal
            title="Adicionar bien"
            description="Agrega un bien a la actualización de datos."
            confirmButtonText="Adicionar"
            portalId="modals"
            formik={formik}
            onCloseModal={handleToggleModal}
            onConfirm={handleAddAsset}
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
        />
      )}
    </>
  );
}

export { PersonalAssetsFormUI };
