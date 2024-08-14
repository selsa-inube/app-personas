import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
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
      id: "",
    });

    const formik = useFormik({
      initialValues,
      validateOnBlur: false,
      onSubmit: async () => true,
    });

    useImperativeHandle(ref, () => formik);

    const handleSelectDocument = async (file: File, id: string) => {
      formik.setFieldValue("selectedDocuments", [
        ...formik.values.selectedDocuments,
        {
          file,
          id,
        },
      ]);
    };

    const handleRemoveDocument = (id: string) => {
      formik.setFieldValue(
        "selectedDocuments",
        formik.values.selectedDocuments.filter(
          (document) => document.id !== id,
        ),
      );
    };

    const handleToggleInfoModal = () => {
      setShowInfoModal(!showInfoModal);
    };

    const handleOpenAttachModal = (id: string) => {
      setAttachModal({
        show: true,
        id,
      });
    };

    const handleCloseAttachModal = () => {
      setAttachModal({
        show: false,
        id: "",
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
