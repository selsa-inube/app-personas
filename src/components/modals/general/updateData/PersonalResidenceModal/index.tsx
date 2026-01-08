import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { CreatePersonalResidence } from "@pages/general/UpdateData/forms/PersonalResidenceForm/CreatePersonalResidence";
import { IResidenceDetailsEntry } from "@pages/general/UpdateData/forms/PersonalResidenceForm/CreatePersonalResidence/forms/ResidenceDetailsForm/types";
import { IResidenceTypeEntry } from "@pages/general/UpdateData/forms/PersonalResidenceForm/CreatePersonalResidence/forms/ResidenceTypeForm/types";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal } from "./styles";

interface PersonalResidenceModalProps {
  portalId: string;
  onCloseModal: () => void;
  onAddResidence: (
    residenceType: IResidenceTypeEntry,
    residenceDetails: IResidenceDetailsEntry,
  ) => void;
}

function PersonalResidenceModal(props: PersonalResidenceModalProps) {
  const { portalId, onCloseModal, onAddResidence } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s200}>
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
                Adicionar residencia
              </Text>
              <Icon
                appearance="dark"
                icon={<MdOutlineClose />}
                onClick={onCloseModal}
                size="20px"
                spacing="narrow"
                cursorHover
              />
            </Stack>
            <Text
              type="body"
              size={isMobile ? "small" : "medium"}
              appearance="gray"
            >
              Agrega información de tu residencia personal
            </Text>
          </Stack>
          <Divider dashed />
        </Stack>
        <Stack direction="column" width="100%" gap={inube.spacing.s150}>
          <CreatePersonalResidence
            onAddResidence={(residenceType, residenceDetails) => {
              onAddResidence(residenceType, residenceDetails);
              onCloseModal();
            }}
          />
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { PersonalResidenceModal };
export type { PersonalResidenceModalProps };