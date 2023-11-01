import { IAction } from "@design/data/Table/types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteDebt } from "./DeleteDebt";
import { PersonalDebtsFormUI } from "./interface";
import { IPersonalDebtEntries } from "./types";
import { EditDebt } from "./EditDebt";

const validationSchema = Yup.object({
  liabilityType: Yup.string().required(validationMessages.required),
  debtName: Yup.string().required(validationMessages.required),
  terminationDate: validationRules.date
    .concat(validationRules.notPastDate)
    .required(validationMessages.required),
  debtBalance: validationRules.money.required(validationMessages.required),
  financialEntity: validationRules.name.required(validationMessages.required),
  quota: validationRules.money.required(validationMessages.required),
});

interface PersonalDebtsFormProps {
  initialValues: IPersonalDebtEntries;
  handleSubmit?: (values: IPersonalDebtEntries) => void;
}

const PersonalDebtsForm = forwardRef(function PersonalDebtsForm(
  props: PersonalDebtsFormProps,
  ref: React.Ref<FormikProps<IPersonalDebtEntries>>
) {
  const { initialValues, handleSubmit } = props;

  const [showAddDebtModal, setShowAddDebtModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddDebtModal(!showAddDebtModal);
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
    formik.setTouched({});
  };

  const handleAddDebt = async () => {
    await formik.validateForm();
    if (formik.isValid && formik.values.liabilityType) {
      setShowAddDebtModal(false);

      formik.setFieldValue("entries", [
        ...formik.values.entries,
        {
          id: String(formik.values.entries.length + 1),
          liabilityType: formik.values.liabilityType,
          debtName: formik.values.debtName,
          terminationDate: formik.values.terminationDate,
          debtBalance: formik.values.debtBalance,
          financialEntity: formik.values.financialEntity,
          quota: formik.values.quota,
          observations: formik.values.observations,
        },
      ]);

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
    }

    formik.setTouched({});
  };

  const handleDeleteDebt = (debtId: string) => {
    const debtIndex = formik.values.entries.findIndex(
      (debt) => debt.id === debtId
    );

    if (debtIndex !== -1) {
      const updatedDebts = [...formik.values.entries];
      updatedDebts.splice(debtIndex, 1);

      formik.setFieldValue("entries", updatedDebts);
    }
  };

  const personalDebtsTableActions: IAction[] = [
    {
      id: "1",
      actionName: "Editar",
      content: (debt) => <EditDebt debt={debt} formik={formik} />,
      mobilePriority: true,
    },
    {
      id: "2",
      actionName: "Borrar",
      content: (debt) => (
        <DeleteDebt
          debt={debt}
          handleDeleteDebt={() => handleDeleteDebt(debt.id)}
        />
      ),
      mobilePriority: true,
    },
  ];

  return (
    <PersonalDebtsFormUI
      formik={formik}
      showAddDebtModal={showAddDebtModal}
      handleToggleModal={handleToggleModal}
      handleAddDebt={handleAddDebt}
      personalDebtsTableActions={personalDebtsTableActions}
    />
  );
});

export { PersonalDebtsForm };
