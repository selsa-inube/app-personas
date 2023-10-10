import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalAssetsFormUI } from "./interface";
import { IPersonalAssetEntries } from "./types";

const validationSchema = Yup.object({
  assetType: Yup.string().required(validationMessages.required),
  commercialValue: validationRules.money.required(validationMessages.required),
  debtBalance: validationRules.money,
  financialEntity: validationRules.name,
  quota: validationRules.money,
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
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: handleSubmit || (() => {}),
  });

  useImperativeHandle(ref, () => formik);

  const handleToggleModal = () => {
    setShowAddAssetModal(!showAddAssetModal);
  };

  const handleAddAsset = async () => {
    await formik.validateForm();
    if (formik.isValid && formik.values.assetType) {
      setShowAddAssetModal(false);

      formik.setFieldValue("entries", [
        ...formik.values.entries,
        {
          id: String(formik.values.entries.length + 1),
          assetType: getValueOfDomain(formik.values.assetType, "assetType")
            ?.value,
          commercialValue: formik.values.commercialValue,
          debtBalance: formik.values.debtBalance,
          financialEntity: formik.values.financialEntity,
          quota: formik.values.quota,
          observations: formik.values.observations,
        },
      ]);
    }
  };

  return (
    <PersonalAssetsFormUI
      formik={formik}
      showAddAssetModal={showAddAssetModal}
      handleToggleModal={handleToggleModal}
      handleAddAsset={handleAddAsset}
    />
  );
});

export { PersonalAssetsForm };
