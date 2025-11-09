import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
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
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";
import { FormikProps, useFormik } from "formik";
import { IContactDataEntry } from "@pages/general/UpdateData/forms/ContactDataForm/types";
import { IServiceDomains } from "src/context/app/types";
import { getFieldState, isInvalid, isRequired } from "@utils/forms/forms";
import * as Yup from "yup";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";

interface ContactModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  loading?: boolean;
  portalId: string;
  cancelText?: string;
  formik: FormikProps<IContactDataEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  departments: {
    loading: boolean;
    list: IOption[];
  };
  cities: {
    loading: boolean;
    list: IOption[];
  };
  onSelectCountry: (name: string, value: string) => Promise<void>;
  onSelectDepartment: (name: string, value: string) => Promise<void>;
  onCloseModal: () => void;
  onClick: (values: IContactDataEntry) => void;
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
    loading,
    portalId,
    cancelText = "Cancelar",
    formik: parentFormik,
    serviceDomains,
    departments,
    cities,
    onSelectCountry,
    onSelectDepartment,
    onCloseModal,
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const localFormik = useFormik({
    initialValues: {
      id: parentFormik.values.id,
      country: parentFormik.values.country,
      countryName: parentFormik.values.countryName,
      department: parentFormik.values.department,
      departmentName: parentFormik.values.departmentName,
      city: parentFormik.values.city,
      cityName: parentFormik.values.cityName,
      address: parentFormik.values.address,
      zipCode: parentFormik.values.zipCode,
      landlinePhone: parentFormik.values.landlinePhone,
      cellPhone: parentFormik.values.cellPhone,
      email: parentFormik.values.email,
    },
    validationSchema: modalValidationSchema,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: () => {
      // This is handled by handleActionClick
    },
  });

  const handleSelectCountry = async (name: string, value: string) => {
    const selectedCountry = serviceDomains.countries.find((c: IOption) => c.value === value);
    localFormik.setFieldValue(name, value);
    localFormik.setFieldValue("countryName", selectedCountry?.label || "");
    localFormik.setFieldValue("department", "");
    localFormik.setFieldValue("departmentName", "");
    localFormik.setFieldValue("city", "");
    localFormik.setFieldValue("cityName", "");

    await onSelectCountry(name, value);
  };

  const handleSelectDepartment = async (name: string, value: string) => {
    const selectedDepartment = departments.list.find((d: IOption) => d.value === value);
    localFormik.setFieldValue(name, value);
    localFormik.setFieldValue("departmentName", selectedDepartment?.label || "");
    localFormik.setFieldValue("city", "");
    localFormik.setFieldValue("cityName", "");

    await onSelectDepartment(name, value);
  };

  const handleSelectCity = (name: string, value: string) => {
    const selectedCity = cities.list.find((c: IOption) => c.value === value);
    localFormik.setFieldValue(name, value);
    localFormik.setFieldValue("cityName", selectedCity?.label || "");
  };

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const handleActionClick = async () => {
    if (loading) return;

    const errors = await localFormik.validateForm();

    if (Object.keys(errors).length === 0) {
      onClick(localFormik.values);
    } else {
      localFormik.setTouched({
        country: true,
        department: true,
        city: true,
        address: true,
        zipCode: true,
      });
    }
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
          <Text type="body" appearance="gray" size={isMobile ? "small" : "large"}>
            {description}
          </Text>
          <Divider dashed />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Autocomplete
            label="País"
            name="country"
            id="country"
            value={localFormik.values.country}
            size="compact"
            fullwidth
            options={serviceDomains.countries}
            onBlur={localFormik.handleBlur}
            message={localFormik.errors.country}
            invalid={isInvalid(localFormik, "country")}
            onChange={(name, value) => handleSelectCountry(name, value)}
            required
          />

          <Autocomplete
            label="Departamento"
            name="department"
            id="department"
            value={localFormik.values.department}
            size="compact"
            fullwidth
            options={departments.list}
            onBlur={localFormik.handleBlur}
            disabled={
              !localFormik.values.country ||
              departments.loading
            }
            message={localFormik.errors.department}
            invalid={isInvalid(localFormik, "department")}
            onChange={(name, value) => handleSelectDepartment(name, value)}
            required
          />

          <Autocomplete
            label="Ciudad"
            name="city"
            id="city"
            value={localFormik.values.city}
            size="compact"
            fullwidth
            options={cities.list}
            onBlur={localFormik.handleBlur}
            message={localFormik.errors.city}
            disabled={
              !localFormik.values.country ||
              !localFormik.values.department ||
              cities.loading
            }
            invalid={isInvalid(localFormik, "city")}
            onChange={(name, value) => handleSelectCity(name, value)}
            required
          />

          <Textfield
            label="Dirección"
            placeholder="Dirección"
            name="address"
            id="address"
            value={localFormik.values.address}
            message={localFormik.errors.address}
            status={getFieldState(localFormik, "address")}
            size="compact"
            fullwidth
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
            required={isRequired(modalValidationSchema, "address")}
          />

          <Numberfield
            label="Código postal"
            placeholder="Código postal"
            name="zipCode"
            id="zipCode"
            type="number"
            value={localFormik.values.zipCode}
            message={localFormik.errors.zipCode}
            status={getFieldState(localFormik, "zipCode")}
            disabled={loading}
            size="compact"
            fullwidth
            onBlur={localFormik.handleBlur}
            onChange={localFormik.handleChange}
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
            disabled={loading || !localFormik.isValid || !localFormik.dirty}
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
