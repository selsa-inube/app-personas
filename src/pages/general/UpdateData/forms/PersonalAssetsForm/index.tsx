import { IAction } from "@design/data/Table/types";
import { EMessageType, IMessage } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { initialMessageState } from "src/utils/messages";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteAsset } from "./DeleteAsset";
import { EditAsset } from "./EditAsset";
import { deleteAssetMessages } from "./config/deleteAsset.config";
import { PersonalAssetsFormUI } from "./interface";
import { IPersonalAssetEntries } from "./types";

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
  onSubmit?: (values: IPersonalAssetEntries) => void;
}

const PersonalAssetsForm = forwardRef(function PersonalAssetsForm(
  props: PersonalAssetsFormProps,
  ref: React.Ref<FormikProps<IPersonalAssetEntries>>,
) {
  const { initialValues, onSubmit } = props;

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [message, setMessage] = useState(initialMessageState);

  const handleShowMessage = (message: IMessage) => {
    const { title, description, icon, appearance } = message;
    setMessage({
      show: true,
      title,
      description,
      icon,
      appearance,
    });
  };

  const handleCloseMessage = () => {
    setMessage(initialMessageState);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
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

    const { icon, title, description, appearance } =
      deleteAssetMessages[MessageType];

    handleShowMessage({
      title,
      description: description(asset?.assetName),
      icon,
      appearance,
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
      message={message}
      onToggleModal={handleToggleModal}
      onAddAsset={handleAddAsset}
      onCloseMessage={handleCloseMessage}
    />
  );
});

export { PersonalAssetsForm };
