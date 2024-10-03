import { IAction } from "@design/data/Table/types";
import { EMessageType } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { DeleteDebt } from "./DeleteDebt";
import { EditDebt } from "./EditDebt";
import { deleteDebtMessages } from "./config/deleteDebt.config";
import { PersonalDebtsFormUI } from "./interface";
import { IPersonalDebtEntries } from "./types";
import { useFlag } from "@inubekit/flag";

const validationSchema = Yup.object({
  liabilityType: Yup.string().required(validationMessages.required),
  debtName: Yup.string().required(validationMessages.required),
  terminationDate: Yup.string()
    .concat(validationRules.notPastDate)
    .required(validationMessages.required),
  debtBalance: validationRules.money.required(validationMessages.required),
  financialEntity: validationRules.name.required(validationMessages.required),
  quota: validationRules.money.required(validationMessages.required),
});

interface PersonalDebtsFormProps {
  initialValues: IPersonalDebtEntries;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalDebtEntries) => void;
}

const PersonalDebtsForm = forwardRef(function PersonalDebtsForm(
  props: PersonalDebtsFormProps,
  ref: React.Ref<FormikProps<IPersonalDebtEntries>>,
) {
  const { initialValues, loading, withSubmit, onSubmit } = props;

  const [showAddDebtModal, setShowAddDebtModal] = useState(false);
  const { addFlag } = useFlag();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
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
    let MessageType = EMessageType.SUCCESS;

    const debt = formik.values.entries.find((entry) => entry.id === debtId);

    const updatedDebts = formik.values.entries.filter(
      (debt) => debt.id !== debtId,
    );

    if (updatedDebts.length === formik.values.entries.length) {
      MessageType = EMessageType.FAILED;
    } else {
      formik.setFieldValue("entries", updatedDebts);
    }

    const { title, description, appearance } = deleteDebtMessages[MessageType];

    addFlag({
      title,
      description: description(debt?.debtName),
      appearance,
      duration: 3000,
    });
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
      actionName: "Eliminar",
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
      personalDebtsTableActions={personalDebtsTableActions}
      loading={loading}
      withSubmit={withSubmit}
      onToggleModal={handleToggleModal}
      onAddDebt={handleAddDebt}
    />
  );
});

export { PersonalDebtsForm };
