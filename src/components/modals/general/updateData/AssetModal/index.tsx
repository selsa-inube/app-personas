import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "src/utils/currency";
import { getFieldState } from "src/utils/forms/forms";
import { StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

const assetTypeDM = getDomainById("assetType");

interface AssetModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikValues;
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
            isFullWidth
            options={assetTypeDM}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.assetType}
            state={getFieldState(formik, "assetType")}
            onChange={formik.handleChange}
            value={formik.values.assetType || ""}
            isRequired
          />
          <TextField
            label="Nombre del activo"
            name="assetName"
            id="assetName"
            placeholder="Digita el nombre del activo"
            value={formik.values.assetName || ""}
            type="text"
            errorMessage={formik.errors.assetName}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "assetName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El nombre del activo es válido"
            isRequired
          />
          <TextField
            label="Valor comercial"
            name="commercialValue"
            id="commercialValue"
            placeholder="Digite el valor comercial estimado"
            value={validateCurrencyField("commercialValue", formik)}
            type="text"
            errorMessage={formik.errors.commercialValue}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "commercialValue")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            validMessage="El valor comercial es válido"
            isRequired
          />
          <TextField
            label="Saldo de la deuda"
            name="debtBalance"
            id="debtBalance"
            placeholder="Digite el saldo total de la deuda"
            value={validateCurrencyField("debtBalance", formik)}
            type="text"
            errorMessage={formik.errors.debtBalance}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "debtBalance")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            validMessage="El saldo de la deuda es válido"
          />
          <TextField
            label="Entidad financiera"
            name="financialEntity"
            id="financialEntity"
            placeholder="Digite el nombre de la entidad"
            value={formik.values.financialEntity || ""}
            type="text"
            errorMessage={formik.errors.financialEntity}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "financialEntity")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El nombre de la entidad es válido"
          />
          <TextField
            label="Cuota"
            name="quota"
            id="quota"
            placeholder="Digite el valor de la cuota"
            value={validateCurrencyField("quota", formik)}
            type="text"
            errorMessage={formik.errors.quota}
            size="compact"
            isFullWidth
            state={getFieldState(formik, "quota")}
            onBlur={formik.handleBlur}
            onChange={(e) => handleChangeWithCurrency(formik, e)}
            validMessage="El valor de la cuota es válido"
          />
          <Textarea
            label="Observaciones"
            name="observations"
            id="observations"
            placeholder="Digite las observaciones"
            value={formik.values.observations || ""}
            errorMessage={formik.errors.observations}
            isFullWidth
            maxLength={120}
            withCounter
            state={getFieldState(formik, "observations")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="Las observaciones son válidas"
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
