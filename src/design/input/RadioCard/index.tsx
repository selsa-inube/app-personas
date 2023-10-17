import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { StyledCardContainer, StyledInputRadio } from "./styles";

interface RadioCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  checked: boolean;
  onClick: () => void;
}

function RadioCard(props: RadioCardProps) {
  const { id, name, title, description, checked, onClick } = props;

  return (
    <StyledCardContainer onClick={onClick}>
      <StyledInputRadio
        id={id}
        name={name}
        type="radio"
        value={id}
        checked={checked}
        readOnly
      />
      <Stack direction="column" gap="s100">
        <Text type="label" size="large">
          {title}
        </Text>
        <Text type="body" size="small" appearance="gray">
          {description}
        </Text>
      </Stack>
    </StyledCardContainer>
  );
}

export { RadioCard };
export type { RadioCardProps };
