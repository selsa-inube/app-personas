import { inube } from "@design/tokens";
import { Icon } from "@inubekit/icon";
import { Spinner } from "@inubekit/spinner";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useState } from "react";
import {
  StyledButton,
  StyledButtonContent,
  StyledLink,
  StyledSpinnerContainer,
} from "./styles";
import {
  ButtonAppearanceType,
  ButtonSpacingType,
  ButtonTypesType,
  ButtonVariantType,
} from "./types";

interface ButtonProps {
  children: React.ReactNode;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  appearance?: ButtonAppearanceType;
  spacing?: ButtonSpacingType;
  variant?: ButtonVariantType;
  fullwidth?: boolean;
  load?: boolean;
  disabled?: boolean;
  path?: string;
  type?: ButtonTypesType;
  onClick?: () => void;
}

function renderButtonContent(
  children: React.ReactNode,
  load: boolean,
  disabled: boolean,
  variant: ButtonVariantType,
  getAppearance: () => ButtonAppearanceType,
  hover: boolean,
  iconAfter?: React.JSX.Element,
  iconBefore?: React.JSX.Element,
) {
  if (load && !disabled) {
    return (
      <StyledSpinnerContainer $variant={variant}>
        <Stack justifyContent="center" alignItems="center" height="inherit">
          <Spinner appearance={getAppearance()} size="small" transparent />
        </Stack>
      </StyledSpinnerContainer>
    );
  }

  return (
    <StyledButtonContent $load={load} $disabled={disabled}>
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={inube.spacing.s075}
      >
        {iconBefore && (
          <Icon
            icon={iconBefore}
            spacing="narrow"
            size="18px"
            appearance={getAppearance()}
            disabled={disabled}
            parentHover={hover}
          />
        )}
        <Text
          type="label"
          size="large"
          appearance={getAppearance()}
          disabled={disabled}
          parentHover={hover}
          ellipsis={true}
        >
          {children}
        </Text>
        {iconAfter && (
          <Icon
            icon={iconAfter}
            spacing="narrow"
            size="18px"
            appearance={getAppearance()}
            disabled={disabled}
            parentHover={hover}
          />
        )}
      </Stack>
    </StyledButtonContent>
  );
}

function Button(props: ButtonProps) {
  const {
    children,
    iconBefore,
    iconAfter,
    appearance = "primary",
    spacing = "wide",
    variant = "filled",
    fullwidth = false,
    load = false,
    disabled = false,
    path = "",
    type = "button",
    onClick,
  } = props;

  const darkWhenFilled: ButtonAppearanceType[] = ["warning", "gray", "light"];

  function getAppearance() {
    if (variant === "filled") {
      if (darkWhenFilled.includes(appearance)) {
        return "dark";
      }
      return "light";
    }
    return appearance;
  }

  const [hover, setHover] = useState(false);
  function toggleHover(newState: boolean): void {
    if (variant !== "filled") {
      setHover(newState);
    }
  }

  if (type === "link") {
    if (path === "" || !path) {
      console.warn('A "path" must be assigned if the type is "link".');
    }

    return (
      <StyledLink
        to={path}
        $appearance={appearance}
        $spacing={spacing}
        $variant={variant}
        $fullwidth={fullwidth}
        $load={load}
        $disabled={disabled}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
      >
        {renderButtonContent(
          children,
          load,
          disabled,
          variant,
          getAppearance,
          hover,
          iconAfter,
          iconBefore,
        )}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      $appearance={appearance}
      $spacing={spacing}
      $variant={variant}
      $fullwidth={fullwidth}
      $load={load}
      $disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      {renderButtonContent(
        children,
        load,
        disabled,
        variant,
        getAppearance,
        hover,
        iconAfter,
        iconBefore,
      )}
    </StyledButton>
  );
}

export { Button };
export type { ButtonProps };
