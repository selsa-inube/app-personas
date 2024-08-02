import { MdClose, MdDone } from "react-icons/md";
import { Label } from "../Label";
import { StyledContainer, StyledIcon, StyledInput, StyledSpan } from "./styles";
import { SwitchSizeType } from "./types";
import { Stack } from "@inubekit/stack";
import { inube } from "@design/tokens";

interface SwitchProps {
  id: string;
  name?: string;
  value?: string;
  size?: SwitchSizeType;
  checked?: boolean;
  label?: string;
  margin?: string;
  padding?: string;
  disabled?: boolean;
  customLabel?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = (props: SwitchProps) => {
  const {
    disabled = false,
    id,
    name,
    value,
    size = "small",
    checked = false,
    label,
    margin = "s0",
    padding = "s0",
    customLabel,
    onChange,
  } = props;

  return (
    <Stack
      direction={"row"}
      justifyContent={label ? "center" : "center"}
      alignItems="center"
      gap={label ? inube.spacing.s100 : inube.spacing.s0}
      margin={margin}
      padding={padding}
    >
      <StyledContainer $size={size}>
        <StyledInput
          id={id}
          type="checkbox"
          value={value}
          $size={size}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
        />
        <StyledSpan $size={size} $disabled={disabled}>
          {checked ? (
            <StyledIcon $checked={checked} $size={size} $disabled={disabled}>
              <MdDone />
            </StyledIcon>
          ) : (
            <StyledIcon $checked={checked} $size={size} $disabled={disabled}>
              <MdClose />
            </StyledIcon>
          )}
        </StyledSpan>
      </StyledContainer>
      {(customLabel || label) && (
        <Label htmlFor={id} isDisabled={disabled}>
          {customLabel || label}
        </Label>
      )}
    </Stack>
  );
};

export { Switch };
export type { SwitchProps };
