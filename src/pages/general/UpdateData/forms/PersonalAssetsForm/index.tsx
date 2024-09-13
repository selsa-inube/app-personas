import { IAction } from "@design/data/Table/types";
import { EMessageType } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteAsset } from "./DeleteAsset";
import { EditAsset } from "./EditAsset";
import { deleteAssetMessages } from "./config/deleteAsset.config";
import { PersonalAssetsFormUI } from "./interface";
import { IPersonalAssetEntries } from "./types";
import { useFlag } from "@inubekit/flag";

const validationSchema = Yup.object({
  assetType: Yup.string().required(validationMessages.required),
  assetName: Yup.string().required(validationMessages.required),
  commercialValue: validationRules.money.required(validationMessages.required),
  debtBalance: validationRules.money,
  financialEntity: validationRules.name,
  quota: validationRules.money,
});

interface PersonalAssetsFormProps {
  initialValues: IPersonalAssetEntries;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalAssetEntries) => void;
}

const PersonalAssetsForm = forwardRef(function PersonalAssetsForm(
  props: PersonalAssetsFormProps,
  ref: React.Ref<FormikProps<IPersonalAssetEntries>>,
) {
  const { initialValues, loading, withSubmit, onSubmit } = props;

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddAssetModal(!showAddAssetModal);
    const fieldsToClear = [
      "assetType",
      "assetName",
      "commercialValue",
      "debtBalance",
      "financialEntity",
      "quota",
      "observations",
    ];

    fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
    formik.setTouched({});
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
          assetName: formik.values.assetName,
          commercialValue: formik.values.commercialValue,
          debtBalance: formik.values.debtBalance,
          financialEntity: formik.values.financialEntity,
          quota: formik.values.quota,
          observations: formik.values.observations,
        },
      ]);

      const fieldsToClear = [
        "assetType",
        "assetName",
        "commercialValue",
        "debtBalance",
        "financialEntity",
        "quota",
        "observations",
      ];

      fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
    }

    formik.setTouched({});
  };

  const handleDeleteAsset = (assetId: string) => {
    let MessageType = EMessageType.SUCCESS;

    const asset = formik.values.entries.find((entry) => entry.id === assetId);

    const updatedAssets = formik.values.entries.filter(
      (asset) => asset.id !== assetId,
    );

    if (updatedAssets.length === formik.values.entries.length) {
      MessageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedAssets);
    }

    const { title, description, appearance } = deleteAssetMessages[MessageType];

    addFlag({
      title,
      description: description(asset?.assetName),
      appearance,
      duration: 3000,
    });
  };

  const personalAssetsTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Editar",
      content: (asset) => <EditAsset asset={asset} formik={formik} />,
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Eliminar",
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
      personalAssetsTableActions={personalAssetsTableActions}
      loading={loading}
      withSubmit={withSubmit}
      onToggleModal={handleToggleModal}
      onAddAsset={handleAddAsset}
    />
  );
});

export { PersonalAssetsForm };
