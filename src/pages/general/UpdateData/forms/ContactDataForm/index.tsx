import { useAuth } from "@inube/auth";
import { IOption } from "@inubekit/inubekit";
import { formikHandleChange } from "@utils/forms/forms";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { getCities } from "src/services/iclient/general/getCities";
import { getDepartments } from "src/services/iclient/general/getDepartments";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { contactDataRequiredFields } from "./config/formConfig";
import { ContactDataFormUI } from "./interface";
import { IContactDataEntry } from "./types";

const validationSchema = Yup.object().shape({
  country: contactDataRequiredFields.country
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  department: contactDataRequiredFields.department
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  city: contactDataRequiredFields.city
    ? Yup.string().required(validationMessages.required)
    : Yup.string(),
  address: contactDataRequiredFields.address
    ? validationRules.address.required(validationMessages.required)
    : validationRules.address,
  zipCode: contactDataRequiredFields.zipCode
    ? validationRules.zipCode.required(validationMessages.required)
    : validationRules.zipCode,
  cellPhone: contactDataRequiredFields.cellPhone
    ? validationRules.phone.required(validationMessages.required)
    : validationRules.phone,
  email: contactDataRequiredFields.email
    ? validationRules.email.required(validationMessages.required)
    : validationRules.email,
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
  const [departments, setDepartments] = useState<{
    loading: boolean;
    list: IOption[];
  }>({
    loading: true,
    list: [],
  });
  const [cities, setCities] = useState<{
    loading: boolean;
    list: IOption[];
  }>({
    loading: true,
    list: [],
  });
  const { accessToken } = useAuth();

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

  const validateDepartments = async (countryCode: string) => {
    if (!accessToken) return;
    setDepartments({
      loading: true,
      list: [],
    });

    const countryId = serviceDomains.countries.find(
      (country) => country.value === countryCode,
    )?.id;

    if (!countryId) return;

    const departments = await getDepartments(accessToken, countryId);

    if (!departments) return;

    setDepartments({
      loading: false,
      list: departments,
    });
  };

  const validateCities = async (departmentCode: string) => {
    if (!accessToken) return;

    setCities({
      loading: true,
      list: [],
    });

    const countryId = serviceDomains.countries.find(
      (country) => country.value === formik.values.country,
    )?.id;

    if (!countryId) return;

    const departmentId = serviceDomains.departments.find(
      (department) => department.value === departmentCode,
    )?.id;

    const cities = await getCities(accessToken, countryId, departmentId);

    if (!cities) return;

    setCities({
      loading: false,
      list: cities,
    });
  };

  useEffect(() => {
    validateDepartments(initialValues.country);
    validateCities(initialValues.department);
  }, []);

  const handleSelectCountry = async (name: string, value: string) => {
    formikHandleChange(name, value, formik);

    validateDepartments(value);
    formik.setFieldValue("department", "");
    formik.setFieldValue("city", "");
  };

  const handleSelectDepartment = async (name: string, value: string) => {
    formikHandleChange(name, value, formik);

    validateCities(value);
    formik.setFieldValue("city", "");
  };

  return (
    <ContactDataFormUI
      loading={loading}
      formik={formik}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      departments={departments}
      cities={cities}
      onSelectCountry={handleSelectCountry}
      onSelectDepartment={handleSelectDepartment}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
