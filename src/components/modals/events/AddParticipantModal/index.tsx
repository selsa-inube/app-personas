import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  Blanket,
  Button,
  Date,
  Divider,
  Icon,
  IOption,
  Select,
  Stack,
  Text,
  Textfield,
} from "@inubekit/inubekit";
import { getFieldState, isInvalid } from "@utils/forms/forms";
import { capitalizeEachWord } from "@utils/texts";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { AppContext } from "src/context/app";
import { IBeneficiary } from "src/model/entity/user";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { StyledModal, StyledModalContent } from "./styles";

const getValidationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(validationMessages.required),
    identificationType: Yup.string().required(validationMessages.required),
    identificationNumber: validationRules.identification.required(
      validationMessages.required,
    ),
    relationship: Yup.string().required(validationMessages.required),
    birthDate: validationRules.date.required(validationMessages.required),
  });

interface AddParticipantModalProps {
  portalId: string;
  allowedRelationships: string[];
  onAddParticipant: (participant: IBeneficiary) => void;
  onCloseModal: () => void;
}

function AddParticipantModal(props: AddParticipantModalProps) {
  const { portalId, allowedRelationships, onAddParticipant, onCloseModal } =
    props;

  const [familyGroup, setFamilyGroup] = useState<IOption[]>([]);

  const formik = useFormik({
    initialValues: {
      participant: "",
      name: "",
      identificationType: "",
      identificationNumber: "",
      relationship: "",
      birthDate: "",
      isOtherParticipant: false,
    },
    validationSchema: getValidationSchema(),
    validateOnBlur: false,
    onSubmit: () => Promise.resolve(),
  });

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);
  const { serviceDomains, user } = useContext(AppContext);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  useEffect(() => {
    const newFamilyGroup: IOption[] = [];

    newFamilyGroup.push({
      id: "other",
      value: "other",
      label: "+ Agregar nuevo participante",
    });

    newFamilyGroup.push({
      id: user.identification,
      value: user.identification,
      label: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
    });

    user.data?.beneficiaries
      ?.filter((beneficiary) =>
        allowedRelationships.includes(beneficiary.relationshipCode || ""),
      )
      .map((beneficiary) => {
        newFamilyGroup.push({
          id: beneficiary.identificationNumber,
          value: beneficiary.identificationNumber,
          label: capitalizeEachWord(beneficiary.name),
        });
      });

    setFamilyGroup(newFamilyGroup);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  const handleChangeSelect = (name: string, value: string) => {
    formik.setFieldValue(name, value);
  };

  const handleAddParticipant = () => {
    if (formik.isValid && formik.dirty) {
      onAddParticipant({
        name: formik.values.name,
        identificationType: formik.values.identificationType,
        identificationNumber: formik.values.identificationNumber,
        relationshipCode: formik.values.relationship,
        birthDate: formik.values.birthDate,
      });
      onCloseModal();
    }
  };

  const handleSelectParticipant = (name: string, value: string) => {
    if (value === "other") {
      formik.setValues({
        name: "",
        identificationType: "",
        identificationNumber: "",
        relationship: "",
        birthDate: "",
        participant: value,
        isOtherParticipant: true,
      });

      return;
    }

    const selectedParticipant = user.data?.beneficiaries?.find(
      (beneficiary) => beneficiary.identificationNumber === value,
    );

    if (!selectedParticipant && value === user.identification) {
      formik.setValues({
        participant: value,
        name: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
        identificationType: "C",
        identificationNumber: user.identification,
        relationship: "D",
        birthDate: user.data?.personalData.birthDate || "",
        isOtherParticipant: false,
      });
      return;
    }

    formik.setValues({
      participant: value,
      name: selectedParticipant?.name || "",
      identificationType: selectedParticipant?.identificationType || "",
      identificationNumber: selectedParticipant?.identificationNumber || "",
      relationship: selectedParticipant?.relationshipCode || "",
      birthDate: selectedParticipant?.birthDate || "",
      isOtherParticipant: false,
    });
  };

  const relationshipOptions = serviceDomains.relationshiptheowner.filter(
    (option) => allowedRelationships.includes(option.value),
  );

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark" weight="bold">
              Agregar participante
            </Text>

            <Icon
              appearance="dark"
              icon={<MdOutlineClose />}
              onClick={onCloseModal}
              cursorHover
              size="20px"
              spacing="narrow"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Diligencia la información para agregar un participante.
          </Text>
        </Stack>

        <Divider dashed />

        <StyledModalContent $smallScreen={isMobile}>
          <Select
            label="Participantes"
            id="participant"
            name="participant"
            options={familyGroup}
            placeholder="Selecciona una opción"
            value={formik.values?.participant || ""}
            onChange={handleSelectParticipant}
            fullwidth
            message={formik.errors.participant}
            invalid={isInvalid(formik, "participant")}
            size="compact"
            onBlur={formik.handleBlur}
          />

          <Select
            label="Parentesco"
            id="relationship"
            name="relationship"
            options={relationshipOptions}
            placeholder="Selecciona una opción"
            value={formik.values?.relationship || ""}
            onChange={handleChangeSelect}
            fullwidth
            disabled={!formik.values?.isOtherParticipant}
            invalid={isInvalid(formik, "relationship")}
            message={formik.errors.relationship}
            size="compact"
            onBlur={formik.handleBlur}
          />

          <Textfield
            label="Nombre"
            placeholder="Escribe el nombre del participante"
            id="name"
            name="name"
            value={formik.values?.name || ""}
            onChange={handleChange}
            required
            fullwidth
            disabled={!formik.values?.isOtherParticipant}
            message={formik.errors.name}
            status={getFieldState(formik, "name")}
            size="compact"
            onBlur={formik.handleBlur}
          />

          <Select
            id="identificationType"
            name="identificationType"
            label="Tipo de documento"
            options={serviceDomains.identificationtype}
            placeholder="Selecciona una opción"
            value={formik.values?.identificationType || ""}
            onChange={handleChangeSelect}
            fullwidth
            disabled={!formik.values?.isOtherParticipant}
            invalid={isInvalid(formik, "identificationType")}
            message={formik.errors.identificationType}
            size="compact"
            onBlur={formik.handleBlur}
          />

          <Textfield
            label="Numero de indentificación"
            placeholder="Digita el numero de identificación"
            id="identificationNumber"
            name="identificationNumber"
            value={formik.values?.identificationNumber || ""}
            onChange={handleChange}
            type="number"
            required
            fullwidth
            disabled={!formik.values?.isOtherParticipant}
            message={formik.errors.identificationNumber}
            status={getFieldState(formik, "identificationNumber")}
            size="compact"
            onBlur={formik.handleBlur}
          />

          <Date
            id="birthDate"
            name="birthDate"
            label="Fecha de nacimiento"
            value={formik.values?.birthDate || ""}
            onChange={handleChange}
            fullwidth
            onBlur={formik.handleBlur}
            status={getFieldState(formik, "birthDate")}
            message={formik.errors.birthDate}
            disabled={!formik.values?.isOtherParticipant}
            size="compact"
          />
        </StyledModalContent>

        <Stack
          direction="row"
          justifyContent="flex-end"
          gap={inube.spacing.s100}
        >
          <Button
            variant="outlined"
            appearance="gray"
            onClick={onCloseModal}
            spacing="compact"
          >
            Atrás
          </Button>

          <Button
            variant="filled"
            appearance="primary"
            onClick={handleAddParticipant}
            spacing="compact"
            disabled={!formik.isValid || !formik.dirty}
          >
            Continuar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { AddParticipantModal };
export type { AddParticipantModalProps };
