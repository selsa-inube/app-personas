import { Text } from "@design/data/Text";
import { Stack } from "@design/layout/Stack";
import { Icon } from "@design/data/Icon";
import { StyledCardContainer, StyledInputRadio } from "./styles";

interface RadioCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  checked: boolean;
  icon?: React.JSX.Element;
  onClick: () => void;
}

function RadioCard(props: RadioCardProps) {
  const { id, name, title, description, checked, icon, onClick } = props;

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
      <Stack direction="column" gap="s075" width="100%">
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="label" size="medium">
            {title}
          </Text>
          {icon && <Icon icon={icon} spacing="none" size="16px" />}
        </Stack>
        <Text type="body" size="small" appearance="gray">
          {description}
        </Text>
      </Stack>
    </StyledCardContainer>
  );
}

export { RadioCard };
export type { RadioCardProps };
