import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalDebtsFormUI } from "./interface";
import { IPersonalDebtEntries } from "./types";
import { currencyFormat } from "src/utils/formats";

const validationSchema = Yup.object({
  liabilityType: Yup.string().required(validationMessages.required),
  terminationDate: validationRules.date.required(validationMessages.required),
  debtBalance: validationRules.money,
  financialEntity: validationRules.name,
  quota: validationRules.money,
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
          liabilityType: getValueOfDomain(
            formik.values.liabilityType,
            "liabilityType"
          )?.value,
          terminationDate: formik.values.terminationDate,
          debtBalance: currencyFormat(Number(formik.values.debtBalance)),
          financialEntity: formik.values.financialEntity,
          quota: currencyFormat(Number(formik.values.quota)),
          observations: formik.values.observations,
        },
      ]);
    }
  };

  return (
    <PersonalDebtsFormUI
      formik={formik}
      showAddDebtModal={showAddDebtModal}
      handleToggleModal={handleToggleModal}
      handleAddDebt={handleAddDebt}
    />
  );
});

export { PersonalDebtsForm };
