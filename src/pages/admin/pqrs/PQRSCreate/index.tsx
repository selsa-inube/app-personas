import { useAuth } from "@inube/auth";
import { IOption, useFlag } from "@inubekit/inubekit";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/app";
import { createPqrsRequest } from "src/services/iclient/pqrs/createPqrsRequest";
import { IRequestPqrs } from "src/services/iclient/pqrs/createPqrsRequest/types";
import { getAttentionPoints } from "src/services/iclient/pqrs/getAttentionPoints";
import { getTypesAndReasonsOptions } from "src/services/iclient/pqrs/getTypesAndReasonsOptions";
import { getSectionMessageByType } from "src/services/iclient/sectionMessage/getSectionMessageByType";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { createPQRS } from "./config/initialValues";
import { CreatePQRSUI } from "./interface";
import { ISelectedDocument } from "./types";

const MAX_SIZE_PER_FILE = 2.5;

const validationSchema = Yup.object().shape({
  type: Yup.string().required(validationMessages.required),
  motive: Yup.string().required(validationMessages.required),
  attentionPlace: Yup.string().required(validationMessages.required),
  description: Yup.string().required(validationMessages.required),
});

function CreatePQRS() {
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const [loadingSend, setLoadingSend] = useState(false);
  const [attachModalId, setAttachModalId] = useState(1);
  const [redirectModal, setRedirectModal] = useState(false);
  const [sectionMessage, setSectionMessage] = useState("");

  const [typeOptions, setTypeOptions] = useState<IOption[]>([]);
  const [reasonOptions, setReasonOptions] = useState<IOption[]>([]);
  const [attentionPoints, setAttentionPoints] = useState<IOption[]>([]);

  const [attachModal, setAttachModal] = useState({
    show: false,
    requirementId: "",
    documentType: "",
  });

  const [reasonsByType, setReasonsByType] = useState<Record<string, IOption[]>>(
    {},
  );

  const { addFlag } = useFlag();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: createPQRS,
    validationSchema,
    validateOnBlur: false,
    onSubmit: () => {
      handleFinishAssisted();
    },
  });

  const pqrsRequestData: IRequestPqrs = {
    description: formik.values.description,
    clientCode: user.identification,
    typeCode: formik.values.type,
    typeName:
      typeOptions.find((option) => option.id === formik.values.type)?.value ||
      "",
    reasonCode: formik.values.motive,
    reasonName:
      reasonOptions.find((option) => option.id === formik.values.motive)
        ?.value || "",
    placeCode: formik.values.attentionPlace,
    placeName:
      attentionPoints.find(
        (option) => option.id === formik.values.attentionPlace,
      )?.value || "",
    documentDetails:
      formik.values.documents?.map((doc) => ({
        documentTypeCode: "RD001",
        sequence: "DOC001",
        fileName: doc.file.name,
      })) || [],
  };

  const pqrsTypeRequest =
    typeOptions.find((option) => option.id === formik.values.type)?.value || "";

  useEffect(() => {
    const fetchDataAndSetOptions = async () => {
      if (!accessToken) return;

      try {
        const data = await getTypesAndReasonsOptions(accessToken);
        setTypeOptions(data.typeOptions || []);
        setReasonsByType(data.reasonsByType || {});
      } catch (error) {
        console.error("Error al obtener tipos y motivos:", error);
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

  useEffect(() => {
    if (!accessToken) return;
    getSectionMessageByType("pqrs", accessToken)
      .then((message) => {
        setSectionMessage(message);
      })
      .catch((error) => {
        console.error("Error al obtener el mensaje", error);
      });
  }, [accessToken]);

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
    if (!accessToken || !user) return;

    setLoadingSend(true);

    createPqrsRequest(pqrsRequestData, accessToken)
      .then(() => {
        setLoadingSend(false);
        setRedirectModal(true);
      })
      .catch(() => {
        addFlag({
          title: "La PQRS no pudo ser creada",
          description:
            "Ya fuimos notificados y estamos revisando. Intenta de nuevo más tarde.",
          appearance: "danger",
          duration: 5000,
        });
        setLoadingSend(false);
      });
  };

  const handleRedirectToHome = () => navigate("/");

  const handleRedirectToRequests = () => navigate("/my-pqrs");

  return (
    <CreatePQRSUI
      formik={formik}
      maxFileSize={MAX_SIZE_PER_FILE}
      loadingSend={loadingSend}
      attachModal={attachModal}
      typeOptions={typeOptions}
      reasonOptions={reasonOptions}
      attentionPointsOptions={attentionPoints}
      redirectModal={redirectModal}
      sectionMessage={sectionMessage}
      pqrsType={pqrsTypeRequest}
      onOpenAttachModal={handleOpenAttachModal}
      onCloseAttachModal={handleCloseAttachModal}
      onSelectDocument={handleSelectDocument}
      onRemoveDocument={handleRemoveDocument}
      onAttachButtonClick={handleAttachButtonClick}
      onRedirectToHome={handleRedirectToHome}
      onRedirectToRequests={handleRedirectToRequests}
    />
  );
}

export { CreatePQRS };
