import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { PersonalResidenceFormUI } from "./interface";
import { IPersonalResidenceEntry } from "./types";
import { IResidenceTypeEntry } from "./CreatePersonalResidence/forms/ResidenceTypeForm/types";
import { IResidenceDetailsEntry } from "./CreatePersonalResidence/forms/ResidenceDetailsForm/types";

const validationSchema = Yup.object().shape({
  type: Yup.string().required(validationMessages.required),
  stratum: Yup.string().required(validationMessages.required),
  bankEntityCode: Yup.string(),
  bankEntityName: Yup.string(),
  dueDate: Yup.string(),
  landlordName: Yup.string(),
  landlordPhone: Yup.string(),
  ownerName: Yup.string(),
  relationship: Yup.string(),
  ownerPhone: Yup.string(),
  otherType: Yup.string(),
});

interface PersonalResidenceFormProps {
  initialValues: IPersonalResidenceEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IPersonalResidenceEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalResidenceForm = forwardRef(function PersonalResidenceForm(
  props: PersonalResidenceFormProps,
  ref: React.Ref<FormikProps<IPersonalResidenceEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty && onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const haveResidence = () => {
    const hasType = formik.values.type && formik.values.type.trim() !== "";
    const hasStratum = formik.values.stratum && formik.values.stratum.trim() !== "";

    if (!hasType || !hasStratum) {
      return false;
    }

    switch (formik.values.type) {
      case "ownWithMortgage":
        return !!(
          formik.values.bankEntityCode &&
          formik.values.bankEntityName &&
          formik.values.dueDate
        );

      case "rent":
        return !!(
          formik.values.landlordName &&
          formik.values.landlordPhone
        );

      case "familiar":
        return !!(
          formik.values.ownerName &&
          formik.values.relationship &&
          formik.values.ownerPhone
        );

      case "other":
        return !!formik.values.otherType;

      case "ownWithoutMortgage":
        return true;

      default:
        return true;
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeletePersonalResidence = () => {
    formik.setValues({
      ...formik.values,
      type: "",
      stratum: "",
      bankEntityCode: "",
      bankEntityName: "",
      dueDate: "",
      landlordName: "",
      landlordPhone: "",
      ownerName: "",
      relationship: "",
      ownerPhone: "",
      otherType: "",
    });
  };

  const handleSavePersonalResidence = (
    residenceType: IResidenceTypeEntry,
    residenceDetails: IResidenceDetailsEntry,
  ) => {
    formik.setFieldValue("type", residenceType.type);
    formik.setFieldValue("stratum", residenceDetails.stratum);
    formik.setFieldValue("bankEntityCode", residenceDetails.bankEntityCode);
    formik.setFieldValue("bankEntityName", residenceDetails.bankEntityName);
    formik.setFieldValue("dueDate", residenceDetails.dueDate);
    formik.setFieldValue("landlordName", residenceDetails.landlordName);
    formik.setFieldValue("landlordPhone", residenceDetails.landlordPhone);
    formik.setFieldValue("ownerName", residenceDetails.ownerName);
    formik.setFieldValue("relationship", residenceDetails.relationship);
    formik.setFieldValue("ownerPhone", residenceDetails.ownerPhone);
    formik.setFieldValue("otherType", residenceDetails.otherType);

    handleToggleModal();
  };

  return (
    <PersonalResidenceFormUI
      loading={loading}
      formik={formik}
      showModal={showModal}
      haveResidence={haveResidence()}
      onToggleModal={handleToggleModal}
      onSavePersonalResidence={handleSavePersonalResidence}
      onDeletePersonalResidence={handleDeletePersonalResidence}
    />
  );
});

export { PersonalResidenceForm };
export type { PersonalResidenceFormProps };
