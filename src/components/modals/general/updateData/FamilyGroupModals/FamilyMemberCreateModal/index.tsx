import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { CreateFamilyMember } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember";
import { IContactDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/InformationDataForm/types";
import { IPersonalDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/PersonalDataForm/types";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal } from "./styles";

interface FamilyMemberCreateModalProps {
  portalId: string;
  onCloseModal: () => void;
  onAddMember: (
    identification: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    InformationData: IInformationDataEntry,
  ) => void;
}

function FamilyMemberCreateModal(props: FamilyMemberCreateModalProps) {
  const { portalId, onCloseModal, onAddMember } = props;

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
                Adicionar familiar
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
              Agrega una persona a tu grupo familiar
            </Text>
          </Stack>
          <Divider dashed />
        </Stack>
        <Stack direction="column" width="100%" gap={inube.spacing.s150}>
          <CreateFamilyMember onAddMember={onAddMember} />
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { FamilyMemberCreateModal };
