import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalAssetsFormUI } from "./interface";
import { IPersonalAssetEntries } from "./types";
import { IAction } from "@design/data/Table/types";
import { Icon } from "@design/data/Icon";
import { MdOutlineModeEdit } from "react-icons/md";
import { DeleteAsset } from "./DeleteAsset";

const validationSchema = Yup.object({
  assetType: Yup.string().required(validationMessages.required),
  commercialValue: validationRules.money.required(validationMessages.required),
  debtBalance: validationRules.money,
  financialEntity: validationRules.name,
  quota: validationRules.money,
});

interface PersonalAssetsFormProps {
  initialValues: IPersonalAssetEntries;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IPersonalAssetEntries) => void;
}

const PersonalAssetsForm = forwardRef(function PersonalAssetsForm(
  props: PersonalAssetsFormProps,
  ref: React.Ref<FormikProps<IPersonalAssetEntries>>
) {
  const { initialValues, onFormValid, handleSubmit } = props;

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddAssetModal(!showAddAssetModal);
  };

  const handleAddAsset = async () => {
    await formik.validateForm();
    if (formik.isValid && formik.values.assetType) {
      setShowAddAssetModal(false);

      formik.setFieldValue("entries", [
        ...formik.values.entries,
        {
          id: String(formik.values.entries.length + 1),
          assetType: formik.values.assetType,
          commercialValue: formik.values.commercialValue,
          debtBalance: formik.values.debtBalance,
          financialEntity: formik.values.financialEntity,
          quota: formik.values.quota,
          observations: formik.values.observations,
        },
      ]);
    }
  };

  const handleDeleteAsset = (assetId: string) => {
    const updatedAssets = formik.values.entries.filter(
      (asset) => asset.id !== assetId
    );

    formik.setFieldValue("entries", updatedAssets);
  };

  const personalAssetsTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Editar",
      content: (asset) => (
        <Icon
          appearance="dark"
          icon={<MdOutlineModeEdit />}
          cursorHover={true}
          size="16px"
          spacing="none"
        />
      ),
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Borrar",
      content: (asset) => (
        <DeleteAsset
          asset={asset}
          handleDeleteAsset={() => handleDeleteAsset(asset.id)}
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <PersonalAssetsFormUI
      formik={formik}
      showAddAssetModal={showAddAssetModal}
      handleToggleModal={handleToggleModal}
      handleAddAsset={handleAddAsset}
      personalAssetsTableActions={personalAssetsTableActions}
    />
  );
});

export { PersonalAssetsForm };
