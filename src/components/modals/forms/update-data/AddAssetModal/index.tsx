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
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { currencyFormat, parseCurrencyString } from "src/utils/formats";
import { StyledDivider, StyledModal } from "./styles";

const assetTypeDM = getDomainById("assetType");

interface AddAssetModalProps {
  portalId: string;
  formik: FormikValues;
  onCloseModal: () => void;
  onAddAsset: () => void;
}

function AddAssetModal(props: AddAssetModalProps) {
  const { portalId, formik, onCloseModal, onAddAsset } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
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
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Adicionar bien
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
          <Text type="body" size="medium" appearance="gray">
            Agrega un bien a la actualización
          </Text>
        </Stack>

        <StyledDivider dashed />
        <Stack direction="column" gap="s150" width="100%">
          <Select
            label="Tipo de activo"
            name="assetType"
            id="assetType"
            size="compact"
            isFullWidth
            options={assetTypeDM}
            handleBlur={formik.handleBlur}
            errorMessage={formik.errors.assetType}
            state={stateValue("assetType")}
            handleChange={formik.handleChange}
            value={formik.values.assetType || ""}
            isRequired
          />
          <TextField
            label="Valor comercial"
            name="commercialValue"
            id="commercialValue"
            placeholder="Digite el valor comercial estimado"
            value={validateCurrencyField("commercialValue")}
            type="text"
            errorMessage={formik.errors.commercialValue}
            size="compact"
            isFullWidth
            state={stateValue("commercialValue")}
            handleBlur={formik.handleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor comercial es válido"
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
            handleBlur={formik.handleBlur}
            handleChange={handleChangeWithCurrency}
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
            state={stateValue("financialEntity")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El nombre de la entidad es válido"
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
            handleBlur={formik.handleBlur}
            handleChange={handleChangeWithCurrency}
            validMessage="El valor de la cuota es válido"
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
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="Las observaciones son válidas"
          />
        </Stack>

        <Stack gap="s100">
          <Button
            spacing="compact"
            appearance="gray"
            handleClick={onCloseModal}
          >
            Cancelar
          </Button>
          <Button
            spacing="compact"
            handleClick={onAddAsset}
            disabled={!formik.dirty || !formik.isValid}
            appearance="primary"
          >
            Adicionar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { AddAssetModal };
