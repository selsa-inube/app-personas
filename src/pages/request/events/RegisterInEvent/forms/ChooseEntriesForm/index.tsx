import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { IEvent } from "src/model/entity/event";
import { IBeneficiary } from "src/model/entity/user";
import { getEntriesCost } from "src/services/iclient/events/getEntriesCost";
import { IGetEntriesCostRequest } from "src/services/iclient/events/getEntriesCost/types";
import { ChooseEntriesFormUI } from "./interface";
import { IChooseEntriesEntry } from "./types";

interface ChooseEntriesFormProps {
  initialValues: IChooseEntriesEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IChooseEntriesEntry) => void;
  loading?: boolean;
}

const ChooseEntriesForm = forwardRef(function ChooseEntriesForm(
  props: ChooseEntriesFormProps,
  ref: React.Ref<FormikProps<IChooseEntriesEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const location = useLocation();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      onFormValid(formik.values.totalEntries > 0);
    }
  }, [formik.values.totalEntries, formik.values.participants]);

  const validateEntriesCost = (event: IEvent) => {
    if (formik.values.entriesCategories.length > 0) return;

    if (!user?.identification || !accessToken || !event.id) return;

    const getEntriesCostRequest: IGetEntriesCostRequest = {
      customerCode: user.identification,
      branch: event.branch,
      typeDocument: event.documentType,
      documentNumber: event.documentNumber,
    };

    getEntriesCost(getEntriesCostRequest, accessToken).then(
      (entriesCategories) => {
        formik.setFieldValue("entriesCategories", entriesCategories);
      },
    );
  };

  useEffect(() => {
    if (!location.state?.event) return;

    formik.setFieldValue("event", location.state?.event);

    validateEntriesCost(location.state?.event);
  }, []);

  const updateEntriesCategories = (
    entriesCategories: typeof formik.values.entriesCategories,
  ) => {
    const totalCount = entriesCategories.reduce(
      (acc, category) => acc + (category.count || 0),
      0,
    );

    const isExceeded =
      totalCount >= (formik.values?.event?.entriesUser || 0) ||
      totalCount >= (formik.values?.event?.ticketsAvailable || 0);

    formik.setFieldValue("entriesCategories", entriesCategories);
    formik.setFieldValue("isExceeded", isExceeded);
    formik.setFieldValue("totalEntries", totalCount);
    formik.setFieldValue(
      "totalValue",
      entriesCategories.reduce(
        (acc, category) => acc + (category.subTotal || 0),
        0,
      ),
    );
  };

  const customHandleChange = (categoryId: string, count: number) => {
    const entriesCategories = formik.values.entriesCategories.map(
      (category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            count: count,
            fullValue: count * category.value,
            subTotal: count * category.value - (category.subsidyValue || 0),
          };
        }
        return category;
      },
    );
    updateEntriesCategories(entriesCategories);
  };

  const handleAddParticipant = (participant: IBeneficiary) => {
    const participants = formik.values.participants || [];
    const existingParticipant = participants.find(
      (p) => p.identificationNumber === participant.identificationNumber,
    );

    if (!existingParticipant && formik.values.entriesCategories.length > 0) {
      formik.setFieldValue("participants", [...participants, participant]);

      const updatedEntriesCategories = formik.values.entriesCategories.map(
        (category, ix) =>
          ix === 0
            ? {
                ...category,
                count: (category.count || 0) + 1,
                fullValue: (category.fullValue || 0) + category.value,
                subTotal:
                  (category.subTotal || 0) +
                  (category.value - (category.subsidyValue || 0)),
              }
            : category,
      );
      updateEntriesCategories(updatedEntriesCategories);
    }
  };

  const handleRemoveParticipant = (participant: IBeneficiary) => {
    const participants = formik.values.participants || [];
    formik.setFieldValue(
      "participants",
      participants.filter(
        (p) => p.identificationNumber !== participant.identificationNumber,
      ),
    );

    const updatedEntriesCategories = formik.values.entriesCategories.map(
      (category, ix) =>
        ix === 0
          ? {
              ...category,
              count: Math.max((category.count || 0) - 1, 0),
              fullValue: Math.max(
                (category.fullValue || 0) - category.value,
                0,
              ),
              subTotal:
                Math.max((category.subTotal || 0) - (category.value || 0), 0) -
                (category.subsidyValue || 0),
            }
          : category,
    );
    updateEntriesCategories(updatedEntriesCategories);
  };

  const handleToggleParticipantModal = () => {
    setShowParticipantModal((prev) => !prev);
  };

  return (
    <ChooseEntriesFormUI
      loading={loading}
      formik={formik}
      showParticipantModal={showParticipantModal}
      onToggleParticipantModal={handleToggleParticipantModal}
      customHandleChange={customHandleChange}
      onAddParticipant={handleAddParticipant}
      onRemoveParticipant={handleRemoveParticipant}
    />
  );
});

export { ChooseEntriesForm };
export type { ChooseEntriesFormProps };
