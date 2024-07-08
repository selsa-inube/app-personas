import { IMessage } from "@ptypes/messages.types";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MdOutlineSentimentNeutral } from "react-icons/md";
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
    const { initialValues, onFormValid } = props;

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [message, setMessage] = useState<IMessage>(initialMessageState);

    const formik = useFormik({
      initialValues,
      validateOnBlur: false,
      onSubmit: async () => true,
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        onFormValid(formik.values.selectedDocuments.length > 0);
      }
    }, [formik.values.selectedDocuments]);

    const handleSelectDocuments = (files: FileList) => {
      const filesUpload: File[] = [];

      for (const file of Array.from(files)) {
        if (file.size > MAX_SIZE_PER_FILE * 1024 * 1024) {
          setMessage({
            show: true,
            title: "Peso máximo excedido",
            description: `No se ha podido cargar el documento porque excede el límite de ${MAX_SIZE_PER_FILE}MB por archivo.`,
            icon: <MdOutlineSentimentNeutral />,
            appearance: "error",
          });
        } else {
          filesUpload.push(file);
        }
      }

      formik.setFieldValue("selectedDocuments", [
        ...formik.values.selectedDocuments,
        ...filesUpload,
      ]);
    };

    const handleRemoveDocument = (id: string) => {
      formik.setFieldValue(
        "selectedDocuments",
        formik.values.selectedDocuments.filter(
          (document) => document.name !== id,
        ),
      );
    };

    const handleToggleInfoModal = () => {
      setShowInfoModal(!showInfoModal);
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
        onSelectDocuments={handleSelectDocuments}
        onRemoveDocument={handleRemoveDocument}
        onToggleInfoModal={handleToggleInfoModal}
        onCloseMessage={handleCloseMessage}
      />
    );
  },
);

export { DocumentaryRequirementsForm };
export type { DocumentaryRequirementsFormProps };
