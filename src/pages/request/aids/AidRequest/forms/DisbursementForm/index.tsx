import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  ChangeEvent,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { SavingsContext } from "src/context/savings";
import { getSavingsForUser } from "src/services/iclient/savings/getSavings";
import * as Yup from "yup";
import { DisbursementFormUI } from "./interface";
import { IDisbursementEntry } from "./types";
import { getAccountOptions } from "./utils";

const validationSchema = Yup.object().shape({
  disbursementMethod: Yup.string().required("Campo requerido"),
  account: Yup.string().required("Campo requerido"),
});

interface DisbursementFormProps {
  initialValues: IDisbursementEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisbursementForm = forwardRef(function DisbursementForm(
  props: DisbursementFormProps,
  ref: React.Ref<FormikProps<IDisbursementEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const { savings, setSavings } = useContext(SavingsContext);
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

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

  const customHandleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    formik.handleChange(event);

    switch (fieldName) {
      case "disbursementMethod": {
        const accountOptions = getAccountOptions(
          value,
          savings.savingsAccounts,
        );

        formik.setFieldValue("accountOptions", accountOptions);

        if (accountOptions.length === 1) {
          formik.setFieldValue("account", accountOptions[0].id);
          formik.setFieldValue("accountDescription", accountOptions[0].value);
        }
        break;
      }

      case "account": {
        const accountOptions = getAccountOptions(
          value,
          savings.savingsAccounts,
        );

        const accountDescription = accountOptions.find(
          (option) => option.id === value,
        )?.value;

        formik.setFieldValue("accountDescription", accountDescription);
        break;
      }

      default:
        break;
    }
  };

  return (
    <DisbursementFormUI
      formik={formik}
      savingAccounts={savings.savingsAccounts}
      customHandleChange={customHandleChange}
    />
  );
});

export { DisbursementForm };
export type { DisbursementFormProps };
