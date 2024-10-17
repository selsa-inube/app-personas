import { useFormik } from "formik";
import { useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { createPQRS } from "./config/initialValues";
import { CreatePQRSUI } from "./interface";
import { ISelectedDocument } from "./types";

const MAX_SIZE_PER_FILE = 2.5;

const validationSchema = Yup.object().shape({
  type: Yup.string().required(validationMessages.required),
  motive: Yup.string().required(validationMessages.required),
  attentionPlace: Yup.string().required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  description: Yup.string().required(validationMessages.required),
});

function CreatePQRS() {
  const [loadingSend, setLoadingSend] = useState(false);
  const [attachModalId, setAttachModalId] = useState(1);
  const [attachModal, setAttachModal] = useState({
    show: false,
    requirementId: "",
    documentType: "",
  });

  const formik = useFormik({
    initialValues: createPQRS,
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: () => {
      handleFinishAssisted();
      formik.resetForm({
        values: createPQRS,
      });
    },
  });

  const handleSelectDocument = async (document: ISelectedDocument) => {
    const currentDocuments = formik.values.documents || [];
    formik.setFieldValue("documents", [...currentDocuments, document]);
  };

  const handleRemoveDocument = (id: string) => {
    if (!Array.isArray(formik.values.documents)) {
      return;
    }

    const updatedDocuments = formik.values.documents.filter(
      (document) => document.id !== id,
    );

    formik.setFieldValue("documents", updatedDocuments);
  };

  const handleOpenAttachModal = (
    requirementId: string,
    documentType: string,
  ) => {
    setAttachModal({
      show: true,
      requirementId,
      documentType,
    });
  };

  const handleCloseAttachModal = () => {
    setAttachModal({
      show: false,
      requirementId: "",
      documentType: "",
    });
  };

  const handleFinishAssisted = () => {
    setLoadingSend(true);

    setTimeout(() => {
      setLoadingSend(false);
    }, 5000);
  };

  const handleAttachButtonClick = () => {
    handleOpenAttachModal(attachModalId.toString(), "113");
    setAttachModalId((prevId) => prevId + 1);
  };

  return (
    <CreatePQRSUI
      formik={formik}
      maxFileSize={MAX_SIZE_PER_FILE}
      loadingSend={loadingSend}
      attachModal={attachModal}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onSelectDocument={handleSelectDocument}
      onRemoveDocument={handleRemoveDocument}
      onAttachButtonClick={handleAttachButtonClick}
    />
  );
}

export { CreatePQRS };
