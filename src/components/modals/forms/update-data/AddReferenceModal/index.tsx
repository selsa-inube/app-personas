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
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { StyledDivider, StyledModal } from "./styles";

const referenceTypeDM = getDomainById("referenceType");

interface AddReferenceModalProps {
  portalId: string;
  formik: FormikValues;
  onCloseModal: () => void;
  onAddReference: () => void;
}

function AddReferenceModal(props: AddReferenceModalProps) {
  const { portalId, formik, onCloseModal, onAddReference } = props;

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

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
        <Stack direction="column" width="100%" gap="s100">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Adicionar referencia
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
            Agrega una referencia personal
          </Text>
        </Stack>

        <StyledDivider dashed />
        <Stack direction="column" gap="s150" width="100%">
          <Select
            label="Tipo de referencia"
            name="referenceType"
            id="referenceType"
            size="compact"
            isFullWidth
            options={referenceTypeDM}
            handleBlur={formik.handleBlur}
            errorMessage={formik.errors.referenceType}
            state={stateValue("referenceType")}
            handleChange={(e) => formik.handleChange(e)}
            value={formik.values.referenceType || ""}
          />
          <TextField
            label="Nombre"
            name="name"
            id="name"
            placeholder="Digite el nombre de la referencia"
            value={formik.values.name || ""}
            type="text"
            errorMessage={formik.errors.name}
            size="compact"
            isFullWidth
            state={stateValue("name")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El nombre de la referencia es válido"
          />
          <TextField
            label="Dirección"
            name="address"
            id="address"
            placeholder="Digite la dirección de residencia"
            value={formik.values.address || ""}
            type="text"
            errorMessage={formik.errors.address}
            size="compact"
            isFullWidth
            state={stateValue("address")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="La dirección es válida"
          />
          <TextField
            label="Correo electrónico"
            name="email"
            id="email"
            placeholder="Digite el correo electrónico"
            value={formik.values.email || ""}
            type="text"
            errorMessage={formik.errors.email}
            size="compact"
            isFullWidth
            state={stateValue("email")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El correo electrónico es válido"
          />
          <TextField
            label="Celular"
            name="phone"
            id="phone"
            placeholder="Digite el número de celular"
            value={formik.values.phone || ""}
            type="text"
            errorMessage={formik.errors.phone}
            size="compact"
            isFullWidth
            state={stateValue("phone")}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            validMessage="El número de celular es válido"
          />
          <Select
            label="Ciudad"
            name="city"
            id="city"
            size="compact"
            isFullWidth
            options={cityDM.options}
            handleBlur={formik.handleBlur}
            errorMessage={formik.errors.city}
            state={stateValue("city")}
            handleChange={formik.handleChange}
            value={formik.values.city || ""}
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
            handleClick={onAddReference}
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

export { AddReferenceModal };
