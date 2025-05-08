import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Date,
  Divider,
  Icon,
  Moneyfield,
  Select,
  Stack,
  Text,
  Textarea,
  Textfield,
} from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IPersonalDebtEntries } from "@pages/general/UpdateData/forms/PersonalDebtsForm/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import {
  formikHandleChange,
  getFieldState,
  getFieldStatus,
  isInvalid,
} from "src/utils/forms/forms";
import { StyledModal } from "./styles";

const liabilityTypeDM = getDomainById("liabilityType");

interface DebtModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikProps<IPersonalDebtEntries>;
  withCustomDirty?: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function DebtModal(props: DebtModalProps) {
  const {
    portalId,
    formik,
    title,
    description,
    confirmButtonText,
    withCustomDirty,
    onCloseModal,
    onConfirm,
  } = props;

  const [customDirty] = useState(formik.values);

  const isMobile = useMediaQuery("(max-width: 550px)");

  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack
          direction="column"
          width="100%"
          gap={isMobile ? inube.spacing.s050 : inube.spacing.s100}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text
              type="title"
              size={isMobile ? "small" : "medium"}
              appearance="dark"
            >
              {title}
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover={true}
              size="20px"
              spacing="narrow"
            />
          </Stack>
          <Text
            type="body"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            {description}
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap={inube.spacing.s150} width="100%">
          <Select
            label="Tipo de pasivo"
            name="liabilityType"
            id="liabilityType"
            size="compact"
            placeholder="Selecciona una opción"
            fullwidth
            options={liabilityTypeDM}
            onBlur={formik.handleBlur}
            message={formik.errors.liabilityType}
            invalid={isInvalid(formik, "liabilityType")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            value={formik.values.liabilityType || ""}
            required
          />
          <Textfield
            label="Nombre del pasivo"
            name="debtName"
            id="debtName"
            placeholder="Digite el nombre del pasivo"
            size="compact"
            value={formik.values.debtName || ""}
            message={formik.errors.debtName}
            status={getFieldState(formik, "debtName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Date
            label="Fecha de terminación"
            name="terminationDate"
            id="terminationDate"
            size="compact"
            value={formik.values.terminationDate}
            message={formik.errors.terminationDate}
            status={getFieldState(formik, "terminationDate")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            fullwidth
          />
          <Moneyfield
            label="Saldo de la deuda"
            name="debtBalance"
            id="debtBalance"
            placeholder="Digite el saldo total de la deuda"
            size="compact"
            value={validateCurrencyField("debtBalance", formik)}
            message={formik.errors.debtBalance}
            status={getFieldState(formik, "debtBalance")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            fullwidth
            required
          />
          <Textfield
            label="Entidad financiera"
            name="financialEntity"
            id="financialEntity"
            placeholder="Digite el nombre de la entidad"
            size="compact"
            value={formik.values.financialEntity || ""}
            message={formik.errors.financialEntity}
            status={getFieldState(formik, "financialEntity")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Moneyfield
            label="Cuota"
            name="quota"
            id="quota"
            placeholder="Digite el valor de la cuota"
            size="compact"
            value={validateCurrencyField("quota", formik)}
            message={formik.errors.quota}
            status={getFieldState(formik, "quota")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            fullwidth
            required
          />
          <Textarea
            label="Observaciones"
            name="observations"
            id="observations"
            placeholder="Digite las observaciones"
            value={formik.values.observations || ""}
            message={formik.errors.observations}
            fullwidth
            maxLength={120}
            status={getFieldStatus(formik, "observations")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Stack>

        <Stack gap={inube.spacing.s100} justifyContent="flex-end">
          <Button
            spacing="compact"
            variant="outlined"
            appearance="gray"
            onClick={onCloseModal}
          >
            Cancelar
          </Button>
          <Button
            spacing="compact"
            onClick={onConfirm}
            disabled={
              withCustomDirty
                ? JSON.stringify(customDirty) == JSON.stringify(formik.values)
                : !formik.dirty || !formik.isValid
            }
            appearance="primary"
          >
            {confirmButtonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { DebtModal };
