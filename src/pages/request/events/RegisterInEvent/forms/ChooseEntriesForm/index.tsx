import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "src/context/app";
import { IEvent } from "src/model/entity/event";
import { getEntriesCost } from "src/services/iclient/events/getEntriesCost";
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
  }, [formik.values.totalEntries]);

  const validateEntriesCost = (event: IEvent) => {
    if (formik.values.entriesCategories.length > 0) return;

    if (!user?.identification || !accessToken || !event.id) return;

    getEntriesCost(user.identification, event.id, accessToken).then(
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

  return (
    <ChooseEntriesFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
    />
  );
});

export { ChooseEntriesForm };
export type { ChooseEntriesFormProps };
