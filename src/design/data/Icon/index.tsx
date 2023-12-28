import { StyledIcon } from "./styles";
import {
  IconAppearanceType,
  IconShapeType,
  IconSpacingType,
  IconVariantType,
} from "./types";

interface IconProps {
  icon: React.JSX.Element;
  appearance?: IconAppearanceType;
  spacing?: IconSpacingType;
  variant?: IconVariantType;
  shape?: IconShapeType;
  size?: string;
  cursorHover?: boolean;
  parentHover?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function Icon(props: IconProps) {
  const {
    icon,
    appearance = "primary",
    spacing = "wide",
    variant = "none",
    shape = "rectangle",
    size = "24px",
    cursorHover = false,
    parentHover = false,
    disabled = false,
    onClick,
  } = props;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <StyledIcon
      appearance={appearance}
      spacing={spacing}
      variant={variant}
      shape={shape}
      size={size}
      cursorHover={cursorHover}
      parentHover={parentHover}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon}
    </StyledIcon>
  );
}

export { Icon };
export type { IconProps };
