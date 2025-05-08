import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Autocomplete,
  Blanket,
  Button,
  Divider,
  Emailfield,
  Icon,
  Phonefield,
  Select,
  Stack,
  Text,
  Textfield,
} from "@inubekit/inubekit";
import { getDomainById } from "@mocks/domains/domainService.mocks";
import { IPersonalReferenceEntries } from "@pages/general/UpdateData/forms/PersonalReferencesForm/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose, MdPhoneAndroid } from "react-icons/md";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import { cityDM } from "src/model/domains/general/updateData/personalInformation/citydm";
import { departmentDM } from "src/model/domains/general/updateData/personalInformation/departamentdm";
import {
  formikHandleChange,
  getFieldState,
  isInvalid,
} from "src/utils/forms/forms";
import { StyledModal } from "./styles";

const referenceTypeDM = getDomainById("referenceType");

interface ReferenceModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  portalId: string;
  formik: FormikProps<IPersonalReferenceEntries>;
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
            label="Tipo de referencia"
            name="referenceType"
            id="referenceType"
            size="compact"
            placeholder="Selecciona una opción"
            options={referenceTypeDM}
            onBlur={formik.handleBlur}
            message={formik.errors.referenceType}
            invalid={isInvalid(formik, "referenceType")}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            value={formik.values.referenceType || ""}
            fullwidth
            required
          />
          <Textfield
            label="Nombre"
            name="name"
            id="name"
            placeholder="Digite el nombre de la referencia"
            size="compact"
            value={formik.values.name || ""}
            message={formik.errors.name}
            status={getFieldState(formik, "name")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Textfield
            label="Dirección"
            name="address"
            id="address"
            placeholder="Digite la dirección de residencia"
            size="compact"
            value={formik.values.address || ""}
            message={formik.errors.address}
            status={getFieldState(formik, "address")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Emailfield
            label="Correo electrónico"
            name="email"
            id="email"
            placeholder="Digite el correo electrónico"
            size="compact"
            value={formik.values.email || ""}
            message={formik.errors.email}
            status={getFieldState(formik, "email")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Phonefield
            label="Celular"
            name="phone"
            id="phone"
            placeholder="Digite el número de celular"
            size="compact"
            value={formik.values.phone || ""}
            iconAfter={<MdPhoneAndroid />}
            message={formik.errors.phone}
            status={getFieldState(formik, "phone")}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullwidth
            required
          />
          <Autocomplete
            label="País"
            name="country"
            id="country"
            placeholder="País"
            size="compact"
            value={
              countryDM.valueOf(formik.values.country || "")?.value ||
              formik.values.country ||
              ""
            }
            message={formik.errors.country}
            onBlur={formik.handleBlur}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            options={countryDM.options}
            fullwidth
            required
          />
          <Autocomplete
            label="Estado / Departamento"
            name="department"
            id="department"
            placeholder="Estado o Departamento"
            size="compact"
            value={
              departmentDM.valueOf(formik.values.department || "")?.value ||
              formik.values.department ||
              ""
            }
            disabled={
              !formik.values.country ||
              !Object.keys(countryDM).includes(formik.values.country)
            }
            message={formik.errors.department}
            onBlur={formik.handleBlur}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            options={departmentDM.options}
            fullwidth
            required
          />
          <Autocomplete
            label="Ciudad"
            name="city"
            id="city"
            placeholder="Ciudad"
            size="compact"
            value={
              cityDM.valueOf(formik.values.city || "")?.value ||
              formik.values.city ||
              ""
            }
            disabled={
              !formik.values.department ||
              !Object.values(departmentDM.options).some(
                (option) => option.id === formik.values.department,
              )
            }
            message={formik.errors.city}
            onBlur={formik.handleBlur}
            onChange={(name, value) => formikHandleChange(name, value, formik)}
            options={cityDM.options}
            fullwidth
            required
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
                ? JSON.stringify(customDirty) === JSON.stringify(formik.values)
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
