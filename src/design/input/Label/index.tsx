import { TypographySizeType } from "@ptypes/typography.types";
import { StyledLabel } from "./styles";

export interface LabelProps {
  isDisabled?: boolean;
  isFocused?: boolean;
  htmlFor?: string;
  isInvalid?: boolean;
  size?: TypographySizeType;
  children: React.ReactNode;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultIsDisabled = false;
const defaultIsFocused = false;
const defaultIsInvalid = false;
const defaultSize: TypographySizeType = "large";

const Label = (props: LabelProps) => {
  const {
    isDisabled = defaultIsDisabled,
    isFocused = defaultIsFocused,
    isInvalid = defaultIsInvalid,
    htmlFor,
    size = defaultSize,
    children,
  } = props;

  const transformedIsDisabled =
    typeof isDisabled === "boolean" ? isDisabled : defaultIsDisabled;

  const transformedIsFocused =
    typeof isFocused === "boolean" ? isFocused : defaultIsFocused;

  const transformedIsInvalid =
    typeof isInvalid === "boolean" ? isInvalid : defaultIsInvalid;

  return (
    <StyledLabel
      isDisabled={transformedIsDisabled}
      isFocused={transformedIsFocused}
      htmlFor={htmlFor}
      isInvalid={transformedIsInvalid}
      size={size}
    >
      {children}
    </StyledLabel>
  );
};

export { Label };
