import { useAuth } from "@inube/auth";
import { mapRequestErrorToTag } from "@utils/handleErrors";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { RequestType } from "src/model/entity/request";
import { ISelectedDocument } from "src/model/entity/service";
import { captureNewError } from "src/services/errors/handleErrors";
import { removeDocument } from "src/services/iclient/documents/removeDocument";
import { DocumentaryRequirementsFormUI } from "./interface";
import { IDocumentaryRequirementsEntry } from "./types";

const MAX_SIZE_PER_FILE = 2.5;

interface DocumentaryRequirementsFormProps {
  initialValues: IDocumentaryRequirementsEntry;
  requestType: RequestType;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentaryRequirementsForm = forwardRef(
  function DocumentaryRequirementsForm(
    props: DocumentaryRequirementsFormProps,
    ref: React.Ref<FormikProps<IDocumentaryRequirementsEntry>>,
  ) {
    const { initialValues, requestType } = props;

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [attachModal, setAttachModal] = useState({
      show: false,
      requirementId: "",
      documentType: "",
    });
    const { accessToken } = useAuth();
    const { user } = useContext(AppContext);

    const formik = useFormik({
      initialValues,
      validateOnBlur: false,
      onSubmit: async () => true,
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      const requiredDocuments = formik.values.requiredDocuments.filter(
        (doc) => doc.required,
      );

      const allRequiredUploaded = requiredDocuments.every((requiredDoc) =>
        formik.values.selectedDocuments.some(
          (selectedDoc) =>
            selectedDoc.requirementId === requiredDoc.id && selectedDoc.file,
        ),
      );

      props.onFormValid?.(allRequiredUploaded);
    }, [formik.values.requiredDocuments, formik.values.selectedDocuments]);

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
          customerCode: user.identification,
        },
        accessToken,
      ).catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleRemoveDocument",
            action: "removeDocument",
            screen: "DocumentaryRequirementsForm",
            file: "src/shared/forms/DocumentaryRequirementsForm/index.tsx",
          },
          { feature: mapRequestErrorToTag(requestType) },
        );
      });
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
        requestType={requestType}
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
