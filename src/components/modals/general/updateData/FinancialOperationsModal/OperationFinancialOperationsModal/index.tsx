import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Divider,
  IButtonAppearance,
  Stack,
  Text,
  Textarea
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";
import { FormikProps, useFormik } from "formik";
import { IFinancialOperationsEntry } from "@pages/general/UpdateData/forms/FinancialOperationsForm/types";
import { getFieldState, isRequired } from "@utils/forms/forms";
import * as Yup from "yup";

interface OperationFinancialOperationsModalProps {
  title: string;
  description: string;
  appearance?: IButtonAppearance;
  actionText: string;
  loading?: boolean;
  portalId: string;
  cancelText?: string;
  formik: FormikProps<IFinancialOperationsEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onCloseModal: () => void;
  onClick: (values: IFinancialOperationsEntry) => void;
}

function OperationFinancialOperationsModal(props: OperationFinancialOperationsModalProps) {
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
      accountNumber: parentFormik.values.accountNumber,
      currentData: parentFormik.values.currentData,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: true,
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
          <Text type="body" appearance="gray" size={isMobile ? "small" : "large"}>
            {description}
          </Text>
          <Divider dashed />
        </Stack>
        <Stack direction="column" gap={inube.spacing.s200}>
          <Textarea
            id="descriptionOperations"
            name="descriptionOperations"
            label="Descripción de la operación"
            placeholder="Realiza una breve descripción acerca de las operaciones que realizas en moneda extranjera"
            maxLength={200}
            disabled={loading}
            value={formik.values.descriptionOperations}
            onChange={formik.handleChange}
            fullwidth
            onBlur={formik.handleBlur}
            required={isRequired(validationSchema, "descriptionOperations")}
            status={getFieldState(formik, "descriptionOperations")}
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

export { OperationFinancialOperationsModal };
export type { OperationFinancialOperationsModalProps };