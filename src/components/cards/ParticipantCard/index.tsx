import { inube } from "@design/tokens";
import { Icon, Stack, Text } from "@inubekit/inubekit";
import { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { AppContext } from "src/context/app";
import { IBeneficiary } from "src/model/entity/user";
import { OutlineCard } from "../OutlineCard";

interface ParticipantCardProps {
  beneficiary: IBeneficiary;
  withButton?: boolean;
  onRemove?: (beneficiary: IBeneficiary) => void;
}

function ParticipantCard(props: ParticipantCardProps) {
  const { beneficiary, withButton, onRemove } = props;
  const { serviceDomains } = useContext(AppContext);

  return (
    <OutlineCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={inube.spacing.s150}
        padding={inube.spacing.s150}
        alignItems="center"
        width="100%"
      >
        <Stack direction="column" gap={inube.spacing.s025}>
          <Text type="label" size="medium" weight="bold">
            {beneficiary.name}
          </Text>
          <Text type="body" size="small" appearance="gray">
            {
              serviceDomains.valueOf(
                beneficiary.identificationType,
                "identificationtype",
              )?.label
            }{" "}
            {beneficiary.identificationNumber}
          </Text>
          <Text type="body" size="small" appearance="gray">
            {
              serviceDomains.valueOf(
                beneficiary.relationshipCode || "",
                "relationshiptheowner",
              )?.label
            }
          </Text>
        </Stack>

        {withButton && onRemove && (
          <Icon
            icon={<MdOutlineDelete />}
            size="24px"
            appearance="danger"
            cursorHover
            onClick={() => onRemove(beneficiary)}
          />
        )}
      </Stack>
    </OutlineCard>
  );
}

export { ParticipantCard };
