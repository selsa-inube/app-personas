import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { EModalActiveState } from "../../types";
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
  const [modalState, setModalState] = useState<EModalActiveState>(
    EModalActiveState.IDLE,
  );

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
    setModalState(EModalActiveState.IDLE);
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

    setModalState(EModalActiveState.IDLE);
  };

  return (
    <PersonalResidenceFormUI
      loading={loading}
      formik={formik}
      modalState={modalState}
      setModalState={setModalState}
      onSavePersonalResidence={handleSavePersonalResidence}
      onDeletePersonalResidence={handleDeletePersonalResidence}
    />
  );
});

export { PersonalResidenceForm };
export type { PersonalResidenceFormProps };
