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
import { cityDM } from "src/model/domains/personalInformation/citydm";
import { getFieldState } from "src/utils/forms/forms";
import { StyledDivider, StyledModal } from "./styles";

const referenceTypeDM = getDomainById("referenceType");

interface ReferenceModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikValues;
  withCustomDirty?: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function ReferenceModal(props: ReferenceModalProps) {
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
            label="Tipo de referencia"
            name="referenceType"
            id="referenceType"
            size="compact"
            isFullWidth
            options={referenceTypeDM}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.referenceType}
            state={getFieldState(formik, "referenceType")}
            onChange={formik.handleChange}
            value={formik.values.referenceType || ""}
            isRequired
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
            state={getFieldState(formik, "name")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El nombre de la referencia es válido"
            isRequired
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
            state={getFieldState(formik, "address")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="La dirección es válida"
            isRequired
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
            state={getFieldState(formik, "email")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El correo electrónico es válido"
            isRequired
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
            state={getFieldState(formik, "phone")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            validMessage="El número de celular es válido"
            isRequired
          />
          <Select
            label="Ciudad"
            name="city"
            id="city"
            size="compact"
            isFullWidth
            options={cityDM.options}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.city}
            state={getFieldState(formik, "city")}
            onChange={formik.handleChange}
            value={formik.values.city || ""}
            isRequired
          />
        </Stack>

        <Stack gap="s100" justifyContent="flex-end">
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

export { ReferenceModal };
