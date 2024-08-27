import { useAuth } from "@inube/auth";
import { disbursementTypeData } from "@mocks/domains/disbursementType";
import { IFormField } from "@ptypes/forms.types";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { statusDM } from "src/model/domains/general/statusdm";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import { generateDynamicForm } from "src/utils/forms/forms";
import { validationMessages } from "src/validations/validationMessages";
import * as Yup from "yup";
import { initalValuesCreditDestination } from "../../config/initialValues";
import { structureDisbursementForm } from "./config/form";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";

const initValidationSchema = Yup.object({
  disbursementType: Yup.string().required(validationMessages.required),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDisbursementEntry) => void;
  loading?: boolean;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>,
) {
  const { initialValues, onSubmit, onFormValid, loading } = props;
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
  const { savings, setSavings } = useContext(SavingsContext);

  const [dynamicForm, setDynamicForm] = useState<{
    renderFields: IFormField[];
    validationSchema: Yup.ObjectSchema<object, Yup.AnyObject, object, "">;
  }>({
    renderFields: [],
    validationSchema: initValidationSchema,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicForm.validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
    enableReinitialize: true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  useEffect(() => {
    formik.setFieldValue("disbursements", disbursementTypeData);
    if (formik.values.disbursementType) {
      const { renderFields, validationSchema } = generateDynamicForm(
        formik,
        structureDisbursementForm(formik, savings.savingsAccounts),
      );

      setDynamicForm({
        renderFields,
        validationSchema: initValidationSchema.concat(validationSchema),
      });
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    if (savings.savingsAccounts.length === 0) {
      getSavingsForUser(user.identification, accessToken)
        .then((savings) => {
          setSavings(savings);
        })
        .catch((error) => {
          console.info(error.message);
        });
    }
  }, [user, accessToken]);

  useEffect(() => {
    if (!formik.values.accountStatus) return;

    if (formik.values.accountStatus === statusDM.REGISTERED.id) {
      formik.setFieldValue("entity", initialValues.transferBankEntity);
      formik.setFieldValue("accountType", initialValues.transferAccountType);
      formik.setFieldValue(
        "writeAccountNumber",
        initialValues.transferAccountNumber,
      );
    } else {
      formik.setFieldValue("entity", "");
      formik.setFieldValue("accountType", "");
      formik.setFieldValue("writeAccountNumber", "");
    }
  }, [formik.values.accountStatus]);

  const customHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    let updatedFormikValues = {
      ...formik.values,
      [name]: value,
    };

    if (name === "disbursementType") {
      formik.setValues({
        ...initalValuesCreditDestination.disbursement,
        disbursements: formik.values.disbursements,
        disbursementType: value,
      });

      updatedFormikValues = {
        ...initalValuesCreditDestination.disbursement,
        disbursements: formik.values.disbursements,
        disbursementType: value,
      };
    } else {
      formik.setFieldValue(name, value);
    }

    const { renderFields, validationSchema } = generateDynamicForm(
      {
        ...formik,
        values: updatedFormikValues,
      },
      structureDisbursementForm(formik, savings.savingsAccounts),
    );

    setDynamicForm({
      renderFields,
      validationSchema: initValidationSchema.concat(validationSchema),
    });
  };

  return (
    <DisbursementFormUI
      loading={loading}
      formik={formik}
      customHandleChange={customHandleChange}
      renderFields={dynamicForm.renderFields}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
