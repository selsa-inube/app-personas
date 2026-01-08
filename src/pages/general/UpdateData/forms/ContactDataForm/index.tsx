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
import { contactDataRequiredFields } from "./config/formConfig";
import { ContactDataFormUI } from "./interface";
import { IAddress, IContactDataEntry } from "./types";

const validationSchema = Yup.object().shape({
  cellPhone: contactDataRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: contactDataRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
  addresses: Yup.array().min(1),
});

interface ContactDataFormProps {
  initialValues: IContactDataEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContactDataEntry) => void;
}

const ContactDataForm = forwardRef(function ContactDataForm(
  props: ContactDataFormProps,
  ref: React.Ref<FormikProps<IContactDataEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const { serviceDomains } = useContext(AppContext);

  const [modalState, setModalState] = useState<{
    show: boolean;
    editEntry: IAddress | undefined;
  }>({
    show: false,
    editEntry: undefined,
  });

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

  const handleDeleteAddress = (id: string) => {
    formik.setValues({
      ...formik.values,
      addresses: formik.values.addresses.filter((address) => address.id !== id),
    });
  };

  const handleSelectEdit = (id: string) => {
    const addressToEdit = formik.values.addresses.find(
      (address) => address.id === id,
    );

    setModalState({
      show: true,
      editEntry: addressToEdit,
    });
  };

  const handleEditAddress = (values: IAddress) => {
    const updatedAddresses = formik.values.addresses.map((address) =>
      address.id === values.id ? values : address,
    );

    formik.setValues({
      ...formik.values,
      addresses: updatedAddresses,
    });

    setModalState({
      show: false,
      editEntry: undefined,
    });
  };

  const handleSaveAddress = (values: IAddress) => {
    formik.setValues({
      ...formik.values,
      addresses: [...formik.values.addresses, { ...values, id: "CP" }],
    });

    setModalState({
      show: false,
      editEntry: undefined,
    });
  };

  const handleToggleModal = () => {
    setModalState({
      show: !modalState.show,
      editEntry: undefined,
    });
  };

  return (
    <ContactDataFormUI
      isLoadingAddressData={loading}
      formik={formik}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      modalState={modalState}
      onDeleteAddress={handleDeleteAddress}
      onSelectEdit={handleSelectEdit}
      onEditAddress={handleEditAddress}
      onSaveAddress={handleSaveAddress}
      onToggleModal={handleToggleModal}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
