import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledModal } from "./styles";
import { Blanket } from "@design/layout/Blanket";
import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@design/data/Icon";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { CreateFamilyMember } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember";
import { IIdentificationDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/PersonalDataForm/types";
import { IContactDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/ContactDataForm/types";
import { IInformationDataEntry } from "@pages/general/UpdateData/forms/FamilyGroupForm/CreateFamilyMember/forms/InformationDataForm/types";
import { Divider } from "@inubekit/divider";


interface FamilyMemberCreateModalProps {
  portalId: string;
  onCloseModal: () => void;
  onAddMember: (
    identification: IIdentificationDataEntry,
    personalData: IPersonalDataEntry,
    contactData: IContactDataEntry,
    InformationData: IInformationDataEntry
  ) => void;
}

function FamilyMemberCreateModal(props: FamilyMemberCreateModalProps) {
  const { portalId, onCloseModal, onAddMember } = props;

  const isMobile = useMediaQuery("(max-width: 750px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s200">
          <Stack
            direction="column"
            width="100%"
            gap={isMobile ? "s050" : "s100"}
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
                spacing="none"
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
        <Stack direction="column" width="100%" gap="s150">
          <CreateFamilyMember onAddMember={onAddMember} />
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { FamilyMemberCreateModal };
