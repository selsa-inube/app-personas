import { useState } from "react";

import { Icon } from "../../data/Icon";
import { Text } from "../../data/Text";
import { Spinner } from "../../feedback/Spinner";
import { Stack } from "../../layout/Stack";

import { AppearanceType, SpacingType, VariantType } from "@ptypes/design.types";

import {
  StyledButton,
  StyledButtonContent,
  StyledSpinnerContainer,
  StyledLink,
} from "./styles";

import { ButtonTypesType } from "./types";

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
  path?: string;
  type?: ButtonTypesType;
  handleClick?: () => void;
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
    handleClick,
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

  function renderButtonContent() {
    if (load && !disabled) {
      return (
        <StyledSpinnerContainer variant={variant}>
          <Stack justifyContent="center" alignItems="center" height="inherit">
            <Spinner appearance={getAppearance()} track={false} />
          </Stack>
        </StyledSpinnerContainer>
      );
    }

    return (
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
    );
  }

  if (type === "link") {
    if (path === "" || !path) {
      console.warn('A "path" must be assigned if the type is "link".');
    }

    return (
      <StyledLink
        to={path}
        appearance={appearance}
        spacing={spacing}
        variant={variant}
        fullwidth={fullwidth}
        load={load}
        disabled={disabled}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
      >
        {renderButtonContent()}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      fullwidth={fullwidth}
      load={load}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      {renderButtonContent()}
    </StyledButton>
  );
}

export { Button };
export type { ButtonProps };
