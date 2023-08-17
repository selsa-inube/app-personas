import { TypographySizeType } from "@ptypes/typography.types";
import { StyledLabel } from "./styles";

interface LabelProps {
  isDisabled?: boolean;
  isFocused?: boolean;
  htmlFor?: string;
  isInvalid?: boolean;
  size?: TypographySizeType;
  children: React.ReactNode;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = (props: LabelProps) => {
  const {
    isDisabled = false,
    isFocused = false,
    isInvalid = false,
    size = "large",
    htmlFor,
    children,
  } = props;

  return (
    <StyledLabel
      isDisabled={isDisabled}
      isFocused={isFocused}
      htmlFor={htmlFor}
      isInvalid={isInvalid}
      size={size}
    >
      {children}
    </StyledLabel>
  );
};

export { Label };
export type { LabelProps };
