import { inube } from "@design/tokens";
import { Divider, SkeletonLine, Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { IAttribute } from "src/model/entity/product";
import { StyledBody, StyledCardContainer, StyledInputRadio } from "./styles";

interface DestinationCardProps {
  id: string;
  title: string;
  description?: string;
  checked: boolean;
  attributes: IAttribute[];
  loading?: boolean;
  onClick: () => void;
}

function DestinationCard(props: DestinationCardProps) {
  const { id, title, description, checked, attributes, loading, onClick } =
    props;

  if (loading) {
    return (
      <StyledCardContainer>
        <Stack direction="column" width="100%" gap={inube.spacing.s050}>
          <Stack gap={inube.spacing.s100}>
            <StyledInputRadio
              id={id}
              name={id}
              type="radio"
              value={id}
              checked={checked}
              readOnly
              disabled
            />

            <SkeletonLine animated width="86px" />
          </Stack>
          {description && <SkeletonLine animated width="108px" />}
        </Stack>

        <Divider dashed />

        <StyledBody $loading>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <SkeletonLine animated width="100px" />

            <SkeletonLine animated width="50px" />
          </Stack>
        </StyledBody>
      </StyledCardContainer>
    );
  }

  return (
    <StyledCardContainer onClick={onClick}>
      <Stack direction="column" width="100%" gap={inube.spacing.s050}>
        <Stack gap={inube.spacing.s100}>
          <StyledInputRadio
            id={id}
            name={id}
            type="radio"
            value={id}
            checked={checked}
            readOnly
          />
          <Text type="label" size="medium">
            {title}
          </Text>
        </Stack>
        {description && (
          <Text type="body" size="small" appearance="gray">
            {description}
          </Text>
        )}
      </Stack>

      <Divider dashed />

      <StyledBody>
        {attributes.map((attribute, index) => (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            key={index}
          >
            <Text type="label" size="small" appearance="gray">
              {attribute.label}:
            </Text>

            <Text type="body" size="small">
              {attribute.value.toString()}
            </Text>
          </Stack>
        ))}
      </StyledBody>
    </StyledCardContainer>
  );
}

export { DestinationCard };
export type { DestinationCardProps };
