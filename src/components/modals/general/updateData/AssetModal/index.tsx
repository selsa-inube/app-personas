import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
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
import { IPersonalAssetEntries } from "@pages/general/UpdateData/forms/PersonalAssetsForm/types";
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

const assetTypeDM = getDomainById("assetType");

interface AssetModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikProps<IPersonalAssetEntries>;
  withCustomDirty?: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function AssetModal(props: AssetModalProps) {
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
            label="Tipo de activo"
            name="assetType"
            id="assetType"
            size="compact"
            placeholder="Selecciona una opción"
            fullwidth
            options={assetTypeDM}
            onBlur={formik.handleBlur}
            message={formik.errors.assetType}
            invalid={isInvalid(formik, "assetType")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            value={formik.values.assetType || ""}
            required
          />
          <Textfield
            label="Nombre del activo"
            name="assetName"
            id="assetName"
            placeholder="Digita el nombre del activo"
            size="compact"
            value={formik.values.assetName || ""}
            message={formik.errors.assetName}
            status={getFieldState(formik, "assetName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Moneyfield
            label="Valor comercial"
            name="commercialValue"
            id="commercialValue"
            placeholder="Digite el valor comercial estimado"
            size="compact"
            value={validateCurrencyField("commercialValue", formik)}
            message={formik.errors.commercialValue}
            status={getFieldState(formik, "commercialValue")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            fullwidth
            required
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

export { AssetModal };
