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
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";
import { FormikProps, useFormik } from "formik";
import { IBankTransfersEntry } from "@pages/general/UpdateData/forms/BankTransfersForm/types";
import { IServiceDomains } from "src/context/app/types";
import { getFieldState, isInvalid, isRequired } from "@utils/forms/forms";
import * as Yup from "yup";
import { accountTypeDM } from "src/model/domains/general/accountTypeDM";

interface BankTransfersModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  loading?: boolean;
  portalId: string;
  cancelText?: string;
  formik: FormikProps<IBankTransfersEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  serviceDomains: IServiceDomains;
  onCloseModal: () => void;
  onClick: (values: IBankTransfersEntry) => void;
}

function BankTransfersModal(props: BankTransfersModalProps) {
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
    onCloseModal,
    onClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const handleFormSubmit = (values: IBankTransfersEntry) => {
    if (!loading) {
      onClick(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      accountNumber: parentFormik.values.accountNumber,
      accountType: parentFormik.values.accountType,
      bankEntityName: parentFormik.values.bankEntityName,
      bankEntityCode: parentFormik.values.bankEntityCode,
      currentData: parentFormik.values.currentData,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: handleFormSubmit,
  });

  const handleSelectBankEntity = (value: string) => {
    const selectedBankEntity = serviceDomains.integratedbanks.find((bank: IOption) => bank.value === value);
    formik.setFieldValue("bankEntityCode", value);
    formik.setFieldValue("bankEntityName", selectedBankEntity?.label || "");
  };

  const handleSelectAccountType = (name: string, value: string) => {
    formik.setFieldValue(name, value);
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
          <Text type="body" appearance="gray" size={isMobile ? "small" : "large"}>
            {description}
          </Text>
          <Divider dashed />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Select
            label="Entidad bancaria"
            name="bankEntityCode"
            id="bankEntityCode"
            value={formik.values.bankEntityCode}
            size="compact"
            fullwidth
            options={serviceDomains.integratedbanks}
            onBlur={formik.handleBlur}
            message={formik.errors.bankEntityCode}
            invalid={isInvalid(formik, "bankEntityCode")}
            onChange={(_, value) => handleSelectBankEntity(value)}
            required={isRequired(validationSchema, "bankEntityCode")}
          />

          <Select
            label="Tipo de cuenta"
            name="accountType"
            id="accountType"
            value={formik.values.accountType.split('-')[1]}
            size="compact"
            fullwidth
            options={accountTypeDM.options}
            onBlur={formik.handleBlur}
            message={formik.errors.accountType}
            invalid={isInvalid(formik, "accountType")}
            onChange={(name, value) => handleSelectAccountType(name, value)}
            required={isRequired(validationSchema, "accountType")}
          />

          <Textfield
            label="Número de cuenta"
            placeholder="Número de cuenta"
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

export { BankTransfersModal };
export type { BankTransfersModalProps };