import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Divider,
  Icon,
  Select,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { IFamilyGroupEntries } from "@pages/general/UpdateData/forms/FamilyGroupForm/types";
import { FormikProps } from "formik";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { activeDM } from "src/model/domains/general/activedm";
import { relationshipDM } from "src/model/domains/general/updateData/personalResidence/relationshipDM";
import {
  formikHandleChange,
  isInvalid,
  isRequired,
} from "src/utils/forms/forms";
import * as Yup from "yup";
import { StyledBox, StyledModal } from "./styles";

interface EditFamilyMemberModalProps {
  portalId: string;
  formik: FormikProps<IFamilyGroupEntries>;
  withCustomDirty?: boolean;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function EditFamilyMemberModal(props: EditFamilyMemberModalProps) {
  const {
    portalId,
    formik,
    withCustomDirty,
    validationSchema,
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
            <Text type="title" size={isMobile ? "small" : "medium"}>
              Editar familiar
            </Text>
            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              size="20px"
              spacing="narrow"
              cursorHover
              onClick={onCloseModal}
            />
          </Stack>
          <Text
            type="body"
            size={isMobile ? "small" : "medium"}
            appearance="gray"
          >
            Edita la información de tu familiar.
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap={inube.spacing.s150} width="100%">
          <>
            <StyledBox>
              <Text
                type="label"
                size="medium"
                appearance="gray"
                weight="normal"
              >
                Estás editando la información de:
              </Text>
              <Text
                type="label"
                size="medium"
                appearance="dark"
                weight="bold"
              >
                {`${formik.values.firstName} ${formik.values.secondName || ''} ${formik.values.firstLastName} ${formik.values.secondLastName}`}
              </Text>
            </StyledBox>
            <Select
              label="Parentesco"
              placeholder="Parentesco"
              name="relationship"
              id="relationship"
              size="compact"
              options={relationshipDM.options}
              onBlur={formik.handleBlur}
              message={formik.errors.relationship}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
              value={formik.values.relationship || ""}
              invalid={isInvalid(formik, "relationship")}
              required={isRequired(validationSchema, "relationship")}
              fullwidth
            />
            <Select
              label="Depende económicamente"
              placeholder="Depende económicamente"
              name="isDependent"
              id="isDependent"
              size="compact"
              options={activeDM.options}
              onBlur={formik.handleBlur}
              message={formik.errors.isDependent}
              onChange={(name, value) =>
                formikHandleChange(name, value, formik)
              }
              value={formik.values.isDependent || ""}
              invalid={isInvalid(formik, "isDependent")}
              required={isRequired(validationSchema, "isDependent")}
              fullwidth
            />
          </>
        </Stack>

        <Stack gap={inube.spacing.s100}>
          <Button
            spacing="compact"
            appearance="gray"
            variant="outlined"
            onClick={onCloseModal}
          >
            Cancelar
          </Button>
          <Button
            spacing="compact"
            onClick={onConfirm}
            disabled={
              !withCustomDirty
                ? JSON.stringify(customDirty) == JSON.stringify(formik.values)
                : !formik.dirty || !formik.isValid
            }
            appearance="primary"
          >
            Guardar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { EditFamilyMemberModal };
