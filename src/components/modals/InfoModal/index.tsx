import { Text } from "@design/data/Text";
import { Button } from "@design/input/Button";
import { Icon } from "@design/data/Icon";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdClear, MdQuestionMark } from "react-icons/md";
import { StyledModal } from "./styles";

interface IInfoModalProps {
  title: string;
  description: string;
  buttonText: string;
  portalId: string;
  onCloseModal?: () => void;
}

function InfoModal(props: IInfoModalProps) {
  const { title, description, buttonText, portalId, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Stack gap="s100">
            <Icon
              icon={<MdQuestionMark />}
              appearance="help"
              spacing="none"
              size="24px"
              variant="filled"
              shape="circle"
            />
            <Text
              type="title"
              appearance="dark"
              size={isMobile ? "small" : "medium"}
            >
              {title}
            </Text>
          </Stack>
          <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
        </Stack>
        <Text type="body" appearance="gray" size={isMobile ? "small" : "large"}>
          {description}
        </Text>
        <Stack justifyContent="flex-end" gap="8px">
          <Button appearance="help" onClick={onCloseModal} spacing="compact">
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export type { IInfoModalProps };
export { InfoModal };
