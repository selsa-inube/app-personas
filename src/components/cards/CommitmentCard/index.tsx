import { inube } from "@design/tokens";
import { ITag, Stack, Tag, Text } from "@inubekit/inubekit";
import { IAttribute } from "src/model/entity/product";
import { StyledCommitmentCard } from "./styles";

interface CommitmentCardProps {
  title: string;
  tag?: ITag;
  navigateTo: string;
  attributes: IAttribute[];
  isMobile: boolean;
}

function CommitmentCard(props: CommitmentCardProps) {
  const { title, tag, navigateTo = '', attributes, isMobile } = props;
  const attributesShow = ["next_payment_value"];

  const filteredAttributes = attributes.filter((attribute) => attributesShow.includes(attribute.id));

  return (
    <StyledCommitmentCard to={navigateTo}>
      <Stack
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? inube.spacing.s100 : undefined}
        alignItems={isMobile ? "initial" : "center"}
        justifyContent={isMobile ? "initial" : "space-between"}
      >
        <Stack
          gap={inube.spacing.s100}
          justifyContent={isMobile ? "space-between" : "initial"}
          alignItems="center"
        >
          <Text
            type="label" size={isMobile ? "small" : "medium"}
            appearance="dark"
            weight="bold"
          >
            {title}
          </Text>
          {
            tag &&
            <Tag
              appearance="danger"
              label="Vencido"
              displayIcon
            />
          }
        </Stack>
        <Stack direction="row" gap={inube.spacing.s300} justifyContent="flex-end">
          {filteredAttributes.map((attribute) => (
            <Stack
              key={attribute.label}
              direction="row"
              gap={inube.spacing.s100}
              justifyContent="flex-end"
            >
              <Text
                type="label"
                size={isMobile ? "small" : "medium"}
                appearance="gray"
                weight="normal"
                textAlign="center"
              >
                {attribute.label}:
              </Text>
              <Text
                type="body"
                size="small"
                appearance="dark"
                weight="normal"
                textAlign="center"
              >
                {String(attribute.value)}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </StyledCommitmentCard>
  );
}

export { CommitmentCard };
export type { CommitmentCardProps };
