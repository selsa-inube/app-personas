import { useState } from "react";
import PropTypes from "prop-types";

import { Text } from "../../data/Text";
import { Spinner } from "../../feedback/Spinner";
import { Stack } from "../../layout/Stack";
import { Icon } from "../../data/Icon";

import { inube } from "../../tokens";

import { appearance, spacing, variant } from "./props";

import {
  StyledButton,
  StyledSpinnerContainer,
  StyledButtonContent,
} from "./styles";

function Button(props) {
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

  const darkWhenFilled = ["warning", "gray", "light"];

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
  function toggleHover(newState) {
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
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={inube.spacing.s075}
        >
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  iconBefore: PropTypes.element,
  iconAfter: PropTypes.element,
  appearance: PropTypes.oneOf(appearance),
  spacing: PropTypes.oneOf(spacing),
  variant: PropTypes.oneOf(variant),
  fullwidth: PropTypes.bool,
  load: PropTypes.bool,
  disabled: PropTypes.bool,
};

export { Button };
