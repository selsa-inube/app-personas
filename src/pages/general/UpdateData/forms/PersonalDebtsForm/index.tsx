import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalDebtsFormUI } from "./interface";
import { IPersonalDebtEntries } from "./types";

const validationSchema = Yup.object({
  terminationDate: validationRules.date.required(validationMessages.required),
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

  useImperativeHandle(ref, () => ({
    ...formik,
  }));

  const handleToggleModal = () => {
    setShowAddDebtModal(!showAddDebtModal);
  };

  return (
    <PersonalDebtsFormUI
      formik={formik}
      showAddDebtModal={showAddDebtModal}
      handleToggleModal={handleToggleModal}
    />
  );
});

export { PersonalDebtsForm };
