import { Icon } from "@design/data/Icon";
import { Text } from "@design/data/Text";
import { Blanket } from "@design/layout/Blanket";
import { Stack } from "@design/layout/Stack";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { StyledDivider, StyledModal } from "./styles";
import { ICommitment } from "src/model/entity/product";
import { Product } from "@components/cards/Product";
import {
  extractMyCommitmentAttributes,
  formatMyCommitmentCurrencyAttrs,
} from "./config/products";

interface CommitmentsSavingModalProps {
  portalId: string;
  commitments: ICommitment[];
  commitmentsIcons: Record<string, React.JSX.Element>;
  onCloseModal: () => void;
}

function CommitmentsSavingModal(props: CommitmentsSavingModalProps) {
  const { portalId, commitments, commitmentsIcons, onCloseModal } = props;

  const smallScreen = useMediaQuery("(max-width: 580px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const limitedCommitments = commitments.slice(0, 5);

  return createPortal(
    <Blanket>
      <StyledModal smallScreen={smallScreen}>
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
              attributes={formatMyCommitmentCurrencyAttrs(
                extractMyCommitmentAttributes(commitment)
              )}
            />
          ))}
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

export { CommitmentsSavingModal };
export type { CommitmentsSavingModalProps };
