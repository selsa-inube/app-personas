import { IMessage } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { initialMessageState } from "src/utils/messages";
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
    const [message, setMessage] = useState<IMessage>(initialMessageState);
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

    const handleCloseMessage = () => {
      setMessage(initialMessageState);
    };

    return (
      <DocumentaryRequirementsFormUI
        formik={formik}
        showInfoModal={showInfoModal}
        maxFileSize={MAX_SIZE_PER_FILE}
        message={message}
        attachModal={attachModal}
        onSelectDocument={handleSelectDocument}
        onRemoveDocument={handleRemoveDocument}
        onToggleInfoModal={handleToggleInfoModal}
        onCloseMessage={handleCloseMessage}
        onOpenAttachModal={handleOpenAttachModal}
        onCloseAttachModal={handleCloseAttachModal}
      />
    );
  },
);

export { DocumentaryRequirementsForm };
export type { DocumentaryRequirementsFormProps };
