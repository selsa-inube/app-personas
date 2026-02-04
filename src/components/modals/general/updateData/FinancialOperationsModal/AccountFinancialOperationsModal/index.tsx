import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Divider,
  IButtonAppearance,
  IOption,
  Select,
  Stack,
  Text,
  Textfield,
} from "@inubekit/inubekit";
import { IFinancialOperationsEntry } from "@pages/general/UpdateData/forms/FinancialOperationsForm/types";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
  isRequired,
} from "@utils/forms/forms";
import { FormikProps, useFormik } from "formik";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { IServiceDomains } from "src/context/app/types";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";
import * as Yup from "yup";
import { StyledModal } from "./styles";

interface AccountFinancialOperationsModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  loading?: boolean;
  portalId: string;
  cancelText?: string;
  formik: FormikProps<IFinancialOperationsEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  currencies: {
    loading: boolean;
    list: IOption[];
  };
  onCloseModal: () => void;
  onClick: (values: IFinancialOperationsEntry) => void;
}

function AccountFinancialOperationsModal(
  props: AccountFinancialOperationsModalProps,
) {
  const {
    title,
    description,
    appearance = "primary",
    actionText,
    loading,
    portalId,
    cancelText = "Cancelar",
    formik: parentFormik,
    validationSchema,
    serviceDomains,
    currencies,
    onCloseModal,
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleFormSubmit = (values: IFinancialOperationsEntry) => {
    if (!loading) {
      onClick(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      descriptionOperations: parentFormik.values.descriptionOperations,
      country: parentFormik.values.country,
      countryName: parentFormik.values.countryName,
      accountType: parentFormik.values.accountType,
      bankEntityName: parentFormik.values.bankEntityName,
      bankEntityCode: parentFormik.values.bankEntityCode,
      currency: parentFormik.values.currency,
      currencyName: parentFormik.values.currencyName,
      accountNumber: parentFormik.values.accountNumber,
      currentData: parentFormik.values.currentData,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    onSubmit: handleFormSubmit,
  });

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
          <Select
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
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            required={isRequired(validationSchema, "country")}
            placeholder="Selecciona el país"
          />

          <Textfield
            label="Entidad bancaria"
            placeholder="Nombre del banco"
            name="bankEntityCode"
            id="bankEntityCode"
            value={formik.values.bankEntityCode}
            message={formik.errors.bankEntityCode}
            status={getFieldState(formik, "bankEntityCode")}
            size="compact"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(validationSchema, "bankEntityCode")}
          />

          <Select
            label="Tipo de cuenta"
            name="accountType"
            id="accountType"
            value={formik.values.accountType}
            size="compact"
            fullwidth
            options={accountTypeDM.options}
            onBlur={formik.handleBlur}
            message={formik.errors.accountType}
            invalid={isInvalid(formik, "accountType")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            required={isRequired(validationSchema, "accountType")}
            placeholder="Selecciona el tipo de cuenta"
          />

          <Select
            label="Moneda"
            placeholder="Selecciona la moneda"
            name="currency"
            id="currency"
            value={formik.values.currency}
            message={formik.errors.currency}
            invalid={isInvalid(formik, "currency")}
            options={currencies.list}
            size="compact"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            disabled={loading || currencies.loading}
            required={isRequired(validationSchema, "currency")}
          />

          <Textfield
            label="Número de cuenta"
            placeholder="Digita el número de cuenta"
            name="accountNumber"
            id="accountNumber"
            value={formik.values.accountNumber}
            message={formik.errors.accountNumber}
            status={getFieldState(formik, "accountNumber")}
            size="compact"
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required={isRequired(validationSchema, "accountNumber")}
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

export { AccountFinancialOperationsModal };
export type { AccountFinancialOperationsModalProps };
