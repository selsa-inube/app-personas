import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalAssetsFormUI } from "./interface";
import { IPersonalAssetEntries } from "./types";

const validationSchema = Yup.object({
  commercialValue: validationRules.money.required(validationMessages.required),
  debtBalance: validationRules.money.required(validationMessages.required),
  financialEntity: validationRules.name.required(validationMessages.required),
  quota: validationRules.money.required(validationMessages.required),
});

interface PersonalAssetsFormProps {
  initialValues: IPersonalAssetEntries;
  handleSubmit?: (values: IPersonalAssetEntries) => void;
}

const PersonalAssetsForm = forwardRef(function PersonalAssetsForm(
  props: PersonalAssetsFormProps,
  ref: React.Ref<FormikProps<IPersonalAssetEntries>>
) {
  const { initialValues, handleSubmit } = props;

  const [showAddAssetModal, setShowAddAssetModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      entries: initialValues.entries,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddAssetModal(!showAddAssetModal);
  };

  return (
    <PersonalAssetsFormUI
      formik={formik}
      showAddAssetModal={showAddAssetModal}
      handleToggleModal={handleToggleModal}
    />
  );
});

export { PersonalAssetsForm };
