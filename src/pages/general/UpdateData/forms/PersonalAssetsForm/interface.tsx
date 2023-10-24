import { AddAssetModal } from "@components/modals/forms/update-data/AddAssetModal";
import { Table } from "@design/data/Table";
import { Button } from "@design/input/Button";
import { Stack } from "@design/layout/Stack";
import { FormikValues } from "formik";
import { MdOutlineAddHome } from "react-icons/md";
import { mapPersonalAssets } from "../../config/mappers";
import {
  personalAssetsTableActions,
  personalAssetsTableBreakpoints,
  personalAssetsTableTitles,
} from "./config/table";

interface PersonalAssetsFormUIProps {
  formik: FormikValues;
  showAddAssetModal: boolean;
  handleToggleModal: () => void;
  handleAddAsset: () => void;
}

function PersonalAssetsFormUI(props: PersonalAssetsFormUIProps) {
  const { formik, showAddAssetModal, handleToggleModal, handleAddAsset } =
    props;

  return (
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
        <AddAssetModal
          portalId="modals"
          formik={formik}
          onCloseModal={handleToggleModal}
          onAddAsset={handleAddAsset}
        />
      )}
    </Stack>
  );
}

export { PersonalAssetsFormUI };
