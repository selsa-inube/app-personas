import { Product } from "@components/cards/Product";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IAttribute, ICommitment } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { StyledModal } from "./styles";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

interface SavingCommitmentsModalProps {
  portalId: string;
  commitments: ICommitment[];
  commitmentsIcons: Record<string, React.JSX.Element>;
  onCloseModal: () => void;
}

function formatValueToPayAttribute(attributes: IAttribute[]) {
  const valueToPayAttribute = attributes.find(
    (attribute) => attribute.id === "next_payment_value",
  );

  if (valueToPayAttribute) {
    const formattedValue = currencyFormat(Number(valueToPayAttribute.value));
    return [
      {
        ...valueToPayAttribute,
        value: formattedValue,
      },
    ];
  } else {
    return [];
  }
}

function SavingCommitmentsModal(props: SavingCommitmentsModalProps) {
  const { portalId, commitments, commitmentsIcons, onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const limitedCommitments = commitments.slice(0, 5);

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap={inube.spacing.s100}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium" appearance="dark">
              Compromisos de ahorro
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
            Compromisos ligados al producto
          </Text>
        </Stack>

        <Divider dashed />
        <Stack direction="column" gap={inube.spacing.s150}>
          {commitments.length === 0
            ? "No se han encontrado resultados"
            : limitedCommitments.map((commitment) => (
                <Product
                  key={commitment.id}
                  title={commitment.title}
                  description={commitment.id}
                  icon={commitmentsIcons[commitment.type]}
                  attributes={formatValueToPayAttribute(commitment.attributes)}
                  navigateTo={`/my-savings/commitment/${commitment.id}`}
                />
              ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { SavingCommitmentsModal };
export type { SavingCommitmentsModalProps };
