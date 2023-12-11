import { Stack } from "@design/layout/Stack";
import { MdClose, MdDone } from "react-icons/md";
import { Label } from "../Label";
import { StyledContainer, StyledIcon, StyledInput, StyledSpan } from "./styles";
import { SwitchSizeType } from "./types";

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
      gap={label ? "s100" : "0px"}
      margin={margin}
      padding={padding}
    >
      <StyledContainer size={size}>
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
        <StyledSpan size={size} disabled={disabled} checked={checked}>
          {checked ? (
            <StyledIcon checked={checked} size={size} disabled={disabled}>
              <MdDone />
            </StyledIcon>
          ) : (
            <StyledIcon checked={checked} size={size} disabled={disabled}>
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
