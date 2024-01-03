import { Product } from "@components/cards/Product";
import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { IAttribute, ICommitment } from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { StyledDivider, StyledModal } from "./styles";

interface SavingCommitmentsModalProps {
  portalId: string;
  commitments: ICommitment[];
  commitmentsIcons: Record<string, React.JSX.Element>;
  onCloseModal: () => void;
}

function formatValueToPayAttribute(attributes: IAttribute[]) {
  const valueToPayAttribute = attributes.find(
    (attribute) => attribute.id === "value_to_pay"
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
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const limitedCommitments = commitments.slice(0, 5);

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={isMobile}>
        <Stack direction="column" width="100%" gap="s100">
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
              spacing="none"
            />
          </Stack>
          <Text type="body" size="medium" appearance="gray">
            Compromisos ligados a la cuenta
          </Text>
        </Stack>

        <StyledDivider dashed />
        <Stack direction="column" gap="s150">
          {limitedCommitments.map((commitment) => (
            <Product
              id={commitment.id}
              key={commitment.id}
              title={commitment.title}
              description={commitment.description}
              icon={commitmentsIcons[commitment.type]}
              attributes={formatValueToPayAttribute(commitment.attributes)}
              navigateTo={`/my-savings/commitment/${commitment.id}`}
            />
          ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { SavingCommitmentsModal };
export type { SavingCommitmentsModalProps };
