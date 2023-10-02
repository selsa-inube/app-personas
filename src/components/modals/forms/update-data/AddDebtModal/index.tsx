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
import { StyledDivider, StyledModal } from "./styles";

interface AddDebtModalProps {
  portalId: string;
  formik: FormikValues;
  onCloseModal: () => void;
  onAddDebt: () => void;
}

function AddDebtModal(props: AddDebtModalProps) {
  const { portalId, formik, onCloseModal, onAddDebt } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  function stateValue(attribute: string) {
    if (!formik.touched[attribute]) return "pending";
    if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
    return "valid";
  }

  const liabilityTypeDM = getDomainById("liabilityType");

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Adicionar deuda
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
            Agrega una deuda a la actualización
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
            handleBlur={formik.handleBlur}
            errorMessage={formik.errors.liabilityType}
            state={stateValue("liabilityType")}
            handleChange={formik.handleChange}
            value={formik.values.liabilityType || ""}
            isRequired
          />
          <TextField
            label="Fecha de terminación"
            name="terminationDate"
            id="terminationDate"
            placeholder="Digite la fecha de terminación"
            value={formik.values.terminationDate|| ""}
            type="text"
            errorMessage={formik.errors.terminationDate}
            size="compact"
            isFullWidth
            state={stateValue("terminationDate")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="La fecha de terminación es válida"
            isRequired
          />
          <TextField
            label="Saldo de la deuda"
            name="debtBalance"
            id="debtBalance"
            placeholder="Digite el saldo total de la deuda"
            value={formik.values.debtBalance|| ""}
            type="text"
            errorMessage={formik.errors.debtBalance}
            size="compact"
            isFullWidth
            state={stateValue("debtBalance")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El saldo de la deuda es válido"
            isRequired
          />
          <TextField
            label="Entidad financiera"
            name="financialEntity"
            id="financialEntity"
            placeholder="Digite el nombre de la entidad"
            value={formik.values.financialEntity|| ""}
            type="text"
            errorMessage={formik.errors.financialEntity}
            size="compact"
            isFullWidth
            state={stateValue("financialEntity")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El nombre de la entidad es válido"
            isRequired
          />
          <TextField
            label="Cuota"
            name="quota"
            id="quota"
            placeholder="Digite el valor de la cuota"
            value={formik.values.quota|| ""}
            type="text"
            errorMessage={formik.errors.quota}
            size="compact"
            isFullWidth
            state={stateValue("quota")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
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
            handleClick={onAddDebt}
            disabled={!formik.isValid}
            appearance="gray"
          >
            Adicionar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { AddDebtModal };
