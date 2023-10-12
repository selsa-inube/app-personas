import { Stack } from "@design/layout/Stack";
import { Label } from "../Label";
import { MdDone, MdClose } from "react-icons/md";
import { StyledContainer, StyledInput, StyledSpan, StyledIcon } from "./styles";
import { SwitchSizeType } from "./types";

interface SwitchProps {
  id: string;
  name?: string;
  value?: string;
  size?: SwitchSizeType;
  checked?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  margin?: string;
  padding?: string;
  disabled?: boolean;
}

const Switch = (props: SwitchProps) => {
  const {
    disabled = false,
    id,
    name,
    value,
    size = "small",
    checked = false,
    handleChange,
    label,
    margin = "s0",
    padding = "s0",
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
          onChange={handleChange}
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
      {label && (
        <Label htmlFor={id} isDisabled={disabled}>
          {label}
        </Label>
      )}
    </Stack>
  );
};

export { Switch };
export type { SwitchProps };
