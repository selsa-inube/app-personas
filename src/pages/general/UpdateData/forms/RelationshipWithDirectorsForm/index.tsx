import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { RelationshipWithDirectorsFormUI } from "./interface";
import { IRelationshipWithDirectorsEntry } from "./types";
import { RelationshipWithDirectorsRequiredFields } from "./config/formConfig";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import { IDirector } from "@mocks/directors/directors.mocks";

const validationSchema = Yup.object().shape({
  hasRelationshipWithDirectors:
    RelationshipWithDirectorsRequiredFields.hasRelationshipWithDirectors
      ? Yup.string().required(validationMessages.required)
      : Yup.string(),
  directorName: RelationshipWithDirectorsRequiredFields.directorName
    ? validationRules.name.required(validationMessages.required)
    : validationRules.name,
  directorRelationship:
    RelationshipWithDirectorsRequiredFields.directorRelationship
      ? Yup.string().required(validationMessages.required)
      : Yup.string(),
});

interface RelationshipWithDirectorsFormProps {
  initialValues: IRelationshipWithDirectorsEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IRelationshipWithDirectorsEntry) => void;
  loading?: boolean;
}

const RelationshipWithDirectorsForm = forwardRef(
  function RelationshipWithDirectorsForm(
    props: RelationshipWithDirectorsFormProps,
    ref: React.Ref<FormikProps<IRelationshipWithDirectorsEntry>>
  ) {
    const { initialValues, onFormValid, onSubmit, loading } = props;

    const [dynamicSchema, setDynamicSchema] = useState(validationSchema);
    const [showDirectorsModal, setShowDirectorsModal] = useState(false);

    const formik = useFormik({
      initialValues,
      validationSchema: dynamicSchema,
      validateOnChange: false,
      onSubmit: onSubmit || (() => {}),
    });

    useImperativeHandle(ref, () => formik);

    const customHandleBlur = (
      event: React.FocusEvent<HTMLElement, Element>
    ) => {
      formik.handleBlur(event);

      if (onSubmit) return;

      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    };

    const handleToggleModal = () => {
      setShowDirectorsModal(!showDirectorsModal);
    };

    const handleModalSelect = (field: string, selectedItem: IDirector) => {
      formik.setFieldValue(field, selectedItem.name);
      handleToggleModal();
    };

    return (
      <RelationshipWithDirectorsFormUI
        loading={loading}
        formik={formik}
        customHandleBlur={customHandleBlur}
        validationSchema={dynamicSchema}
        showDirectorsModal={showDirectorsModal}
        handleToggleModal={handleToggleModal}
        handleModalSelect={handleModalSelect}
      />
    );
  }
);

export { RelationshipWithDirectorsForm };
export type { RelationshipWithDirectorsFormProps };
