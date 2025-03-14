import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ISelectedDocument } from "src/model/entity/service";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { DocumentaryRequirementsFormUI } from "./interface";
import { IDocumentaryRequirementsEntry } from "./types";

const MAX_SIZE_PER_FILE = 2.5;

interface DocumentaryRequirementsFormProps {
  initialValues: IDocumentaryRequirementsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentaryRequirementsForm = forwardRef(
  function DocumentaryRequirementsForm(
    props: DocumentaryRequirementsFormProps,
    ref: React.Ref<FormikProps<IDocumentaryRequirementsEntry>>,
  ) {
    const { initialValues } = props;

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [attachModal, setAttachModal] = useState({
      show: false,
      requirementId: "",
      documentType: "",
    });
    const { accessToken } = useAuth();

    const formik = useFormik({
      initialValues,
      validateOnBlur: false,
      onSubmit: async () => true,
    });

    useImperativeHandle(ref, () => formik);

    const handleSelectDocument = async (documents: ISelectedDocument[]) => {
      formik.setFieldValue("selectedDocuments", [
        ...formik.values.selectedDocuments,
        ...documents,
      ]);
    };

    const handleRemoveDocument = (
      id: string,
      documentType?: string,
      sequence?: number,
    ) => {
      formik.setFieldValue(
        "selectedDocuments",
        formik.values.selectedDocuments.filter(
          (document) => document.id !== id,
        ),
      );

      if (!accessToken || !documentType || !sequence) return;

      removeDocument(
        {
          documentType,
          sequence,
        },
        accessToken,
      );
    };

    const handleToggleInfoModal = () => {
      setShowInfoModal(!showInfoModal);
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

    return (
      <DocumentaryRequirementsFormUI
        formik={formik}
        showInfoModal={showInfoModal}
        maxFileSize={MAX_SIZE_PER_FILE}
        attachModal={attachModal}
        onSelectDocument={handleSelectDocument}
        onRemoveDocument={handleRemoveDocument}
        onToggleInfoModal={handleToggleInfoModal}
        onOpenAttachModal={handleOpenAttachModal}
        onCloseAttachModal={handleCloseAttachModal}
      />
    );
  },
);

export { DocumentaryRequirementsForm };
export type { DocumentaryRequirementsFormProps };
