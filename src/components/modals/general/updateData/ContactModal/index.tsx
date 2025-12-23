import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { useAuth } from "@inube/auth";
import {
  Autocomplete,
  Blanket,
  Button,
  Divider,
  IButtonAppearance,
  IOption,
  Numberfield,
  Stack,
  Text,
  Textfield,
} from "@inubekit/inubekit";
import { IAddress } from "@pages/general/UpdateData/forms/ContactDataForm/types";
import { getFieldState, isInvalid, isRequired } from "@utils/forms/forms";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import { getCities } from "src/services/iclient/general/getCities";
import { getDepartments } from "src/services/iclient/general/getDepartments";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { StyledModal } from "./styles";

interface ContactModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  portalId: string;
  cancelText?: string;
  editEntry?: IAddress;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  onCloseModal: () => void;
  onClick: (values: IAddress) => void;
}

const modalValidationSchema = Yup.object().shape({
  country: Yup.string().required(validationMessages.required),
  department: Yup.string().required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
  address: validationRules.address.required(validationMessages.required),
  zipCode: Yup.number(),
});

function ContactModal(props: ContactModalProps) {
  const {
    title,
    description,
    appearance = "primary",
    actionText,
    portalId,
    editEntry,
    cancelText = "Cancelar",
    serviceDomains,
    onCloseModal,
    onClick,
  } = props;

  const { accessToken } = useAuth();

  const [departments, setDepartments] = useState<IOption[]>([]);
  const [cities, setCities] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleFormSubmit = (values: IAddress) => {
    if (!loading) {
      onClick(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: editEntry ? editEntry.id : "",
      country: editEntry ? editEntry.country : "",
      countryName: editEntry ? editEntry.countryName : "",
      department: editEntry ? editEntry.department : "",
      departmentName: editEntry ? editEntry.departmentName : "",
      city: editEntry ? editEntry.city : "",
      cityName: editEntry ? editEntry.cityName : "",
      address: editEntry ? editEntry.address : "",
      zipCode: editEntry ? editEntry.zipCode : "",
      landlinePhone: editEntry ? editEntry.landlinePhone : "",
    },
    validationSchema: modalValidationSchema,
    validateOnBlur: false,
    onSubmit: handleFormSubmit,
  });

  const validateDepartments = async (countryCode: string) => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const countryId = serviceDomains.countries.find(
        (country) => country.value === countryCode,
      )?.id;

      if (!countryId) return;

      const newDepartments = await getDepartments(accessToken, countryId);

      if (!newDepartments) return;

      setDepartments(newDepartments);
    } finally {
      setLoading(false);
    }
  };

  const validateCities = async (
    countryCode: string,
    departmentCode: string,
  ) => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const countryId = serviceDomains.countries.find(
        (country) => country.value === countryCode,
      )?.id;

      if (!countryId) return;

      const departmentId = serviceDomains.departments.find(
        (department) => department.value === departmentCode,
      )?.id;

      const newCities = await getCities(accessToken, countryId, departmentId);

      if (!newCities) return;

      setCities(newCities);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editEntry) {
      validateDepartments(editEntry.country);
      validateCities(editEntry.country, editEntry.department);
    }
  }, []);

  useEffect(() => {
    formik.validateForm();
  }, [formik.values]);

  const handleChangeCountry = async (name: string, value: string) => {
    const selectedCountry = serviceDomains.countries.find(
      (c: IOption) => c.value === value,
    );
    formik.setFieldValue(name, value);
    formik.setFieldValue("countryName", selectedCountry?.label || "");
    formik.setFieldValue("department", "");
    formik.setFieldValue("departmentName", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("cityName", "");

    await validateDepartments(value);
  };

  const handleChangeDepartment = async (name: string, value: string) => {
    const selectedDepartment = departments.find(
      (d: IOption) => d.value === value,
    );
    formik.setFieldValue(name, value);
    formik.setFieldValue("departmentName", selectedDepartment?.label || "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("cityName", "");

    await validateCities(formik.values.country, value);
  };

  const handleChangeCity = (name: string, value: string) => {
    if (!value) return;

    const selectedCity = cities.find((c: IOption) => c.value === value);
    formik.setFieldValue(name, value);
    formik.setFieldValue("cityName", selectedCity?.label || "");
  };

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const handleActionClick = () => {
    formik.submitForm();
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Stack alignItems="center" justifyContent="space-between">
            <Text
              type="title"
              appearance="dark"
              weight="bold"
              size={isMobile ? "small" : "medium"}
            >
              {title}
            </Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
          <Text
            type="body"
            appearance="gray"
            size={isMobile ? "small" : "large"}
          >
            {description}
          </Text>
          <Divider dashed />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Autocomplete
            label="País"
            name="country"
            id="country"
            value={formik.values.country}
            size="compact"
            fullwidth
            options={serviceDomains.countries}
            onBlur={formik.handleBlur}
            message={formik.errors.country}
            invalid={isInvalid(formik, "country")}
            onChange={(name, value) => handleChangeCountry(name, value)}
            required
          />

          <Autocomplete
            label="Departamento"
            name="department"
            id="department"
            value={formik.values.department}
            size="compact"
            fullwidth
            options={departments}
            onBlur={formik.handleBlur}
            disabled={!formik.values.country || loading}
            message={formik.errors.department}
            invalid={isInvalid(formik, "department")}
            onChange={(name, value) => handleChangeDepartment(name, value)}
            required
          />

          <Autocomplete
            label="Ciudad"
            name="city"
            id="city"
            value={formik.values.city}
            size="compact"
            fullwidth
            options={cities}
            onBlur={formik.handleBlur}
            message={formik.errors.city}
            disabled={
              !formik.values.country ||
              !formik.values.department ||
              loading ||
              cities.length === 0
            }
            invalid={isInvalid(formik, "city")}
            onChange={(name, value) => handleChangeCity(name, value)}
            required
          />

          <Textfield
            label="Dirección"
            placeholder="Dirección"
            name="address"
            id="address"
            value={formik.values.address}
            message={formik.errors.address}
            status={getFieldState(formik, "address")}
            size="compact"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(modalValidationSchema, "address")}
          />

          <Numberfield
            label="Código postal"
            placeholder="Código postal"
            name="zipCode"
            id="zipCode"
            type="number"
            value={formik.values.zipCode}
            message={formik.errors.zipCode}
            status={getFieldState(formik, "zipCode")}
            disabled={loading}
            size="compact"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(modalValidationSchema, "zipCode")}
          />
        </Stack>
        <Stack justifyContent="flex-end" gap={inube.spacing.s100}>
          <Button
            appearance="gray"
            onClick={onCloseModal}
            spacing="compact"
            variant="outlined"
          >
            {cancelText}
          </Button>
          <Button
            appearance={appearance}
            loading={loading}
            onClick={handleActionClick}
            spacing="compact"
            disabled={loading || !formik.isValid || !formik.dirty}
          >
            {actionText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ContactModal };
export type { ContactModalProps };
