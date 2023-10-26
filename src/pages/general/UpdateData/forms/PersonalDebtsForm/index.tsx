import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalDebtsFormUI } from "./interface";
import { IPersonalDebtEntries } from "./types";
import { IAction } from "@design/data/Table/types";
import { Icon } from "@design/data/Icon";
import { MdOutlineModeEdit } from "react-icons/md";
import { DeleteDebt } from "./DeleteDebt";

const validationSchema = Yup.object({
  liabilityType: Yup.string().required(validationMessages.required),
  terminationDate: validationRules.date.required(validationMessages.required),
  debtBalance: validationRules.money.required(validationMessages.required),
  financialEntity: validationRules.name.required(validationMessages.required),
  quota: validationRules.money.required(validationMessages.required),
});

interface PersonalDebtsFormProps {
  initialValues: IPersonalDebtEntries;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: (values: IPersonalDebtEntries) => void;
}

const PersonalDebtsForm = forwardRef(function PersonalDebtsForm(
  props: PersonalDebtsFormProps,
  ref: React.Ref<FormikProps<IPersonalDebtEntries>>
) {
  const { initialValues, onFormValid, handleSubmit } = props;

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
          terminationDate: formik.values.terminationDate,
          debtBalance: formik.values.debtBalance,
          financialEntity: formik.values.financialEntity,
          quota: formik.values.quota,
          observations: formik.values.observations,
        },
      ]);
    }
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
      content: (debt) => (
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
