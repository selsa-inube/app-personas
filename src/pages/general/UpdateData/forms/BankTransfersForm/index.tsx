import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { EModalActiveState } from "../../types";
import { BankTransfersFormUI } from "./interface";
import { IBankTransfersEntry } from "./types";

const validationSchema = Yup.object().shape({
  bankEntityCode: Yup.string().required(validationMessages.required),
  bankEntityName: Yup.string().required(validationMessages.required),
  accountType: Yup.string().required(validationMessages.required),
  accountNumber: validationRules.accountNumber.required(
    validationMessages.required,
  ),
});

interface BankTransfersFormProps {
  initialValues: IBankTransfersEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onSubmit?: (values: IBankTransfersEntry) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BankTransfersForm = forwardRef(function BankTransfersForm(
  props: BankTransfersFormProps,
  ref: React.Ref<FormikProps<IBankTransfersEntry>>,
) {
  const { initialValues, loading, onFormValid, onSubmit } = props;
  const { serviceDomains } = useContext(AppContext);

  const [modalState, setModalState] = useState<EModalActiveState>(
    EModalActiveState.IDLE,
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    if (formik.dirty) {
      formik.validateForm().then((errors) => {
        onFormValid && onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  const handleDeleteBankTransfers = () => {
    formik.setValues({
      ...formik.values,
      bankEntityName: "",
      bankEntityCode: "",
      accountType: "",
      accountNumber: "",
    });
    setModalState(EModalActiveState.IDLE);
  };

  const handleSaveBankTransfers = (values: IBankTransfersEntry) => {
    formik.setValues({
      ...formik.values,
      bankEntityName: values.bankEntityName,
      bankEntityCode: values.bankEntityCode,
      accountType: values.accountType,
      accountNumber: values.accountNumber,
    });
    setModalState(EModalActiveState.IDLE);
  };

  return (
    <BankTransfersFormUI
      loading={loading}
      formik={formik}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      modalState={modalState}
      setModalState={setModalState}
      onDeleteBankTransfers={handleDeleteBankTransfers}
      onSaveBankTransfers={handleSaveBankTransfers}
    />
  );
});

export { BankTransfersForm };
export type { BankTransfersFormProps };
