import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { FormikValues } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";
import { StyledDivider, StyledModal } from "./styles";

const liabilityTypeDM = getDomainById("liabilityType");

interface DebtModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikValues;
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
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const stateValue = (fieldName: string) => {
    if (!formik.touched[fieldName]) return "pending";
    if (formik.touched[fieldName] && formik.errors[fieldName]) return "invalid";
    return "valid";
  };

  const handleChangeWithCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrencyString(e.target.value);
    formik.setFieldValue(e.target.name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const validateCurrencyField = (fieldName: string) => {
    return typeof formik.values[fieldName] === "number"
      ? currencyFormat(formik.values[fieldName])
      : "";
  };

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={isMobile ? "s050" : "s100"}>
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
              spacing="none"
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

        <StyledDivider dashed />
        <Stack direction="column" gap="s150" width="100%">
          <Select
            label="Tipo de pasivo"
            name="liabilityType"
            id="liabilityType"
            size="compact"
            isFullWidth
            options={liabilityTypeDM}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.liabilityType}
            state={stateValue("liabilityType")}
            onChange={formik.handleChange}
            value={formik.values.liabilityType || ""}
            isRequired
          />
          <TextField
            label="Nombre del pasivo"
            name="debtName"
            id="debtName"
            placeholder="Digite el nombre del pasivo"
            value={formik.values.debtName || ""}
            type="text"
            errorMessage={formik.errors.debtName}
            size="compact"
            isFullWidth
            state={stateValue("debtName")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El nombre del pasivo es válido"
            isRequired
          />
          <TextField
            label="Fecha de terminación"
            name="terminationDate"
            id="terminationDate"
            placeholder="Ejemplo: 01/Ene/1990"
            value={formik.values.terminationDate || ""}
            type="text"
            errorMessage={formik.errors.terminationDate}
            size="compact"
            isFullWidth
            state={stateValue("terminationDate")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="La fecha de terminación es válida"
            isRequired
          />
          <TextField
            label="Saldo de la deuda"
            name="debtBalance"
            id="debtBalance"
            placeholder="Digite el saldo total de la deuda"
            value={validateCurrencyField("debtBalance")}
            type="text"
            errorMessage={formik.errors.debtBalance}
            size="compact"
            isFullWidth
            state={stateValue("debtBalance")}
            onBlur={formik.handleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El saldo de la deuda es válido"
            isRequired
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
            state={stateValue("financialEntity")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El nombre de la entidad es válido"
            isRequired
          />
          <TextField
            label="Cuota"
            name="quota"
            id="quota"
            placeholder="Digite el valor de la cuota"
            value={validateCurrencyField("quota")}
            type="text"
            errorMessage={formik.errors.quota}
            size="compact"
            isFullWidth
            state={stateValue("quota")}
            onBlur={formik.handleBlur}
            onChange={handleChangeWithCurrency}
            validMessage="El valor de la cuota es válido"
            isRequired
          />
          <TextField
            label="Observaciones"
            name="observations"
            id="observations"
            placeholder="Digite las observaciones"
            value={formik.values.observations || ""}
            type="text"
            errorMessage={formik.errors.observations}
            size="compact"
            isFullWidth
            state={stateValue("observations")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="Las observaciones son válidas"
          />
        </Stack>

        <Stack gap="s100">
          <Button spacing="compact" appearance="gray" onClick={onCloseModal}>
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
    node
  );
}

export { DebtModal };
