import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Blanket, Divider, Icon, Stack, Text } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IAttribute } from "src/model/entity/product";
import { StyledModal } from "./styles";

interface AttributesModalProps {
  title: string;
  description?: string;
  portalId: string;
  attributes: IAttribute[];
  onCloseModal: () => void;
}

function AttributesModal(props: AttributesModalProps) {
  const { title, description, portalId, attributes, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const limitedAttributes = attributes.slice(0, 10);

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="large" appearance="dark">
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
          <Text type="body" size="medium" appearance="gray">
            {description}
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap={inube.spacing.s150}>
          {attributes.length === 0
            ? "No se han encontrado resultados"
            : limitedAttributes.map((attribute, index) => (
                <BoxAttribute
                  key={index}
                  label={attribute.label}
                  value={attribute.value}
                />
              ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { AttributesModal };
export type { AttributesModalProps };
