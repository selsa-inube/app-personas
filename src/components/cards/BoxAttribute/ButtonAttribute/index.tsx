import { StyledContainer, StyledIcon } from "./styles";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

interface ButtonAttributeProps {
  icon?: React.JSX.Element;
  value?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

function ButtonAttribute(props: ButtonAttributeProps) {
  const { icon, value, disabled, onClick } = props;
  return (
    <StyledContainer onClick={!disabled ? onClick : undefined}>
      {icon && (
        <StyledIcon>
          <Icon
            icon={icon}
            appearance="primary"
            size="16px"
            spacing="narrow"
            disabled={disabled}
          />
        </StyledIcon>
      )}

      <Text type="body" size="small" appearance="dark">
        {value}
      </Text>
    </StyledContainer>
  );
}

export { ButtonAttribute };
