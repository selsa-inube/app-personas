import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { StyledBodyItem, StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

interface ReimbursementModalProps {
  portalId: string;
  onCloseModal: () => void;
  reimbursement: IAttribute[];
}

function ReimbursementModal(props: ReimbursementModalProps) {
  const { portalId, onCloseModal, reimbursement } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s050}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
              Cuenta para reembolso
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
          <Text type="body" size="medium" appearance="gray">
            Detalles del reembolso
          </Text>
        </Stack>

        <Divider />
        <Stack
          direction="column"
          alignItems="flex-start"
          gap={inube.spacing.s075}
        >
          {reimbursement.map((attr) => (
            <StyledBodyItem key={attr.id}>
              <Text type="label" size="large" appearance="dark">
                {attr.label}
              </Text>

              <Text type="body" size="medium" appearance="gray">
                {String(attr.value)}
              </Text>
            </StyledBodyItem>
          ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { ReimbursementModal };
