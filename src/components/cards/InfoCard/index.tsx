import { Icon, Text } from "@inubekit/inubekit";
import {
  StyledButtonContainer,
  StyledButtonIcon,
  StyledInfoCard,
} from "./styles";

interface InfoCardProps {
  label: string;
  value?: string | number;
  appearance?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  withButton?: boolean;
  buttonIcon?: React.JSX.Element;
  buttonValue?: string | number;
  buttonDisabled?: boolean;
  onClickButton?: () => void;
}

function InfoCard(props: InfoCardProps) {
  const {
    label,
    value,
    appearance = "gray",
    withButton,
    buttonIcon,
    buttonValue,
    buttonDisabled,
    onClickButton,
  } = props;

  return (
    <StyledInfoCard $appearance={appearance}>
      <Text type="label" size="large" appearance="gray" weight="bold">
        {label}
      </Text>
      {withButton ? (
        <StyledButtonContainer
          onClick={!buttonDisabled ? onClickButton : undefined}
        >
          {buttonIcon && (
            <StyledButtonIcon>
              <Icon
                icon={buttonIcon}
                appearance="primary"
                size="20px"
                spacing="narrow"
                disabled={buttonDisabled}
              />
            </StyledButtonIcon>
          )}
          <Text type="body" size="medium" appearance="dark" weight="normal">
            {buttonValue}
          </Text>
        </StyledButtonContainer>
      ) : (
        <Text type="body" size="medium" appearance="dark" weight="normal">
          {value}
        </Text>
      )}
    </StyledInfoCard>
  );
}

export { InfoCard };
export type { InfoCardProps };
