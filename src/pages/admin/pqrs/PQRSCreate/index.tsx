import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { createPQRS } from "./config/initialValues";
import { CreatePQRSUI } from "./interface";
import { ISelectedDocument } from "./types";
import { getTypesAndReasonsOptions } from "src/services/iclient/pqrs/getTypesAndReasonsOptions";
import { useAuth } from "@inube/auth";
import { ISelectOption } from "@design/input/Select/types";
import { getAttentionPoints } from "src/services/iclient/pqrs/getAttentionPoints";

const MAX_SIZE_PER_FILE = 2.5;

const validationSchema = Yup.object().shape({
  type: Yup.string().required(validationMessages.required),
  motive: Yup.string().required(validationMessages.required),
  attentionPlace: Yup.string().required(validationMessages.required),
  email: validationRules.email.required(validationMessages.required),
  description: Yup.string().required(validationMessages.required),
});

function CreatePQRS() {
  const { accessToken } = useAuth();
  const [loadingSend, setLoadingSend] = useState(false);
  const [attachModalId, setAttachModalId] = useState(1);
  const [attachModal, setAttachModal] = useState({
    show: false,
    requirementId: "",
    documentType: "",
  });
  const [typeOptions, setTypeOptions] = useState<ISelectOption[]>([]);
  const [reasonOptions, setReasonOptions] = useState<ISelectOption[]>([]);
  const [reasonsByType, setReasonsByType] = useState<
    Record<string, ISelectOption[]>
  >({});
  const [attentionPoints, setAttentionPoints] = useState<ISelectOption[]>([]);

  const formik = useFormik({
    initialValues: createPQRS,
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {
      handleFinishAssisted();
      formik.resetForm({ values: createPQRS });
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

  const handleAttachButtonClick = () => {
    handleOpenAttachModal(attachModalId.toString(), "113");
    setAttachModalId((prevId) => prevId + 1);
  };

  const handleFinishAssisted = () => {
    setLoadingSend(true);
    setTimeout(() => setLoadingSend(false), 3000);
  };

  useEffect(() => {
    const fetchDataAndSetOptions = async () => {
      if (accessToken) {
        try {
          const data = await getTypesAndReasonsOptions(accessToken);
          setTypeOptions(data.typeOptions || []);
          setReasonsByType(data.reasonsByType || {});
        } catch (error) {
          console.error("Error al obtener tipos y motivos:", error);
        }
      }
    };

    if (!Object.keys(reasonsByType).length) {
      fetchDataAndSetOptions();
    }

    const selectedType = formik.values.type;
    setReasonOptions(reasonsByType[selectedType] || []);
  }, [accessToken, formik.values.type]);

  useEffect(() => {
    if (attentionPoints.length > 0 || !accessToken) return;

    getAttentionPoints(accessToken).then((points) => {
      setAttentionPoints(points);
    });
  }, []);

  return (
    <CreatePQRSUI
      formik={formik}
      maxFileSize={MAX_SIZE_PER_FILE}
      loadingSend={loadingSend}
      attachModal={attachModal}
      typeOptions={typeOptions}
      reasonOptions={reasonOptions}
      attentionPointsOptions={attentionPoints}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onSelectDocument={handleSelectDocument}
      onRemoveDocument={handleRemoveDocument}
      onAttachButtonClick={handleAttachButtonClick}
    />
  );
}

export { CreatePQRS };
