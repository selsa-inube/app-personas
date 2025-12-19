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
import { EModalActiveState } from "../../types";
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
  const [isLoadingAddressData, setLoadingAddressData] = useState<boolean>(true);
  const { accessToken } = useAuth();
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

  useEffect(() => {
    if (serviceDomains.countries.length === 0) return;

    const countryName =
      serviceDomains.countries.find(
        (country) => country.value === formik.values.country,
      )?.label || formik.values.countryName;

    const departmentName =
      serviceDomains.departments.find(
        (department) => department.value === formik.values.department,
      )?.label || formik.values.departmentName;

    const cityName =
      serviceDomains.cities.find((city) => city.value === formik.values.city)
        ?.label || formik.values.cityName;

    if (
      countryName !== formik.values.countryName ||
      departmentName !== formik.values.departmentName ||
      cityName !== formik.values.cityName
    ) {
      formik.setValues(
        {
          ...formik.values,
          countryName,
          departmentName,
          cityName,
        },
        false,
      );
    }

    setLoadingAddressData(false);
  }, [
    serviceDomains.countries,
    serviceDomains.departments,
    serviceDomains.cities,
  ]);

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

  const handleDeleteAddress = () => {
    formik.setValues({
      ...formik.values,
      address: "",
      country: "",
      countryName: "",
      department: "",
      departmentName: "",
      city: "",
      cityName: "",
      zipCode: "",
    });
    setModalState(EModalActiveState.IDLE);
  };

  const handleSaveAddress = (values: IContactDataEntry) => {
    formik.setValues({
      ...formik.values,
      address: values.address,
      country: values.country,
      countryName: values.countryName,
      department: values.department,
      departmentName: values.departmentName,
      city: values.city,
      cityName: values.cityName,
      zipCode: values.zipCode,
    });
    setModalState(EModalActiveState.IDLE);
  };

  return (
    <ContactDataFormUI
      isLoadingAddressData={loading || isLoadingAddressData}
      formik={formik}
      validationSchema={validationSchema}
      serviceDomains={serviceDomains}
      departments={departments}
      cities={cities}
      modalState={modalState}
      onSelectCountry={handleSelectCountry}
      onSelectDepartment={handleSelectDepartment}
      onDeleteAddress={handleDeleteAddress}
      onSaveAddress={handleSaveAddress}
      setModalState={setModalState}
    />
  );
});

export { ContactDataForm };
export type { ContactDataFormProps };
