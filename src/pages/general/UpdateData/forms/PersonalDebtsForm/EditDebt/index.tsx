import { useState } from "react";
import { EditDebtUI } from "./interface";
import { IEntry } from "@design/data/Table/types";
import { FormikValues } from "formik";
import { IPersonalDebtEntry } from "../types";

interface EditDebtProps {
  debt: IEntry;
  formik: FormikValues;
}

const getEditDebt = (debt: IPersonalDebtEntry, formik: FormikValues) => {
  const debtToEdit: IPersonalDebtEntry = formik.values.entries.find(
    (entry: IPersonalDebtEntry) => entry.id === debt.id
  );

  if (debtToEdit) {
    formik.setValues({
      entries: formik.values.entries,
      ...debtToEdit,
    });
  }
};

function EditDebt(props: EditDebtProps) {
  const { debt, formik } = props;

  const [showModal, setShowModal] = useState(false);

  const handleEditDebt = async () => {
    await formik.validateForm();

    if (formik.isValid && formik.values.liabilityType) {
      setShowModal(false);
      const updatedEntries: IPersonalDebtEntry = formik.values.entries.map(
        (entry: IPersonalDebtEntry) => {
          if (entry.id === debt.id) {
            return {
              id: debt.id,
              liabilityType: formik.values.liabilityType,
              debtName: formik.values.debtName,
              terminationDate: formik.values.terminationDate,
              debtBalance: formik.values.debtBalance,
              financialEntity: formik.values.financialEntity,
              quota: formik.values.quota,
              observations: formik.values.observations,
            };
          }
          return entry;
        }
      );

      formik.setFieldValue("entries", updatedEntries);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
    const fieldsToClear = [
      "liabilityType",
      "debtName",
      "terminationDate",
      "debtBalance",
      "financialEntity",
      "quota",
      "observations",
    ];

    fieldsToClear.forEach((field) => formik.setFieldValue(field, ""));
  };

  const handleEditModal = () => {
    setShowModal(true);
    getEditDebt(debt, formik);
  };

  return (
    <EditDebtUI
      formik={formik}
      showModal={showModal}
      handleEditModal={handleEditModal}
      handleEditDebt={handleEditDebt}
      closeModal={handleToggleModal}
    />
  );
}

export { EditDebt };
