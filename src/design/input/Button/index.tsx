import { useState } from "react";

import { Text } from "../../data/Text";
import { Spinner } from "../../feedback/Spinner";
import { Stack } from "../../layout/Stack";
import { Icon } from "../../data/Icon";

import {
  AppearanceType,
  SpacingType,
  VariantType,
} from "src/types/design.types";

import {
  StyledButton,
  StyledSpinnerContainer,
  StyledButtonContent,
} from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  appearance?: AppearanceType;
  spacing?: SpacingType;
  variant?: VariantType;
  fullwidth?: boolean;
  load?: boolean;
  disabled?: boolean;
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
  } = props;

  const darkWhenFilled: AppearanceType[] = ["warning", "gray", "light"];

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

  return (
    <StyledButton
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      fullwidth={fullwidth}
      load={load}
      disabled={disabled}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      {load && !disabled && (
        <StyledSpinnerContainer variant={variant}>
          <Stack justifyContent="center" alignItems="center" height="inherit">
            <Spinner appearance={getAppearance()} track={false} />
          </Stack>
        </StyledSpinnerContainer>
      )}
      <StyledButtonContent load={load} disabled={disabled}>
        <Stack alignItems="center" justifyContent="center" gap="s075">
          {iconBefore && (
            <Icon
              icon={iconBefore}
              spacing="none"
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
              spacing="none"
              size="18px"
              appearance={getAppearance()}
              disabled={disabled}
              parentHover={hover}
            />
          )}
        </Stack>
      </StyledButtonContent>
    </StyledButton>
  );
}

export { Button };
export type { ButtonProps };
