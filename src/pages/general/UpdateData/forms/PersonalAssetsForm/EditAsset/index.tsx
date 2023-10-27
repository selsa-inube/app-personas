import { useState } from "react";
import { EditAssetUI } from "./interface";
import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { IPersonalAssetEntry } from "../types";

interface EditAssetProps {
  asset: IEntry;
  formik: FormikValues;
}

function EditAsset(props: EditAssetProps) {
  const { asset, formik } = props;

  const [showModal, setShowModal] = useState(false);

  const getEditAsset = () => {
    const assetToEdit = formik.values.entries.find(
      (entry: IPersonalAssetEntry) => entry.id === asset.id
    );

    if (assetToEdit) {
      formik.setValues({
        ...formik.values,
        ...assetToEdit,
      });
    }
  };

  const updateAsset = (entry: IPersonalAssetEntry) => {
    if (entry.id === asset.id) {
      return {
        id: asset.id,
        ...formik.values,
      };
    } else {
      return entry;
    }
  };

  const handleEditAsset = async () => {
    await formik.validateForm();

    if (formik.isValid && formik.values.assetType) {
      setShowModal(false);
      const updatedEntries = formik.values.entries.map(updateAsset);

      formik.setFieldValue("entries", updatedEntries);
    }

    const fieldsToClear = [
      "assetType",
      "commercialValue",
      "debtBalance",
      "financialEntity",
      "quota",
      "observations",
    ];

    fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));

    formik.setTouched({});
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditModal = () => {
    setShowModal(true);
    getEditAsset();
  };

  return (
    <EditAssetUI
      formik={formik}
      showModal={showModal}
      handleEditModal={handleEditModal}
      handleEditAsset={handleEditAsset}
      closeModal={handleToggleModal}
    />
  );
}

export { EditAsset };
