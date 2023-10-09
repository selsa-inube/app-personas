import { Stack } from "@design/layout/Stack";
import { Label } from "../Label";
import { MdDone, MdClose } from "react-icons/md";
import { StyledContainer, StyledInput, StyledSpan, StyledIcon } from "./styles";
import  { SwitchSizeType } from "./types";

interface SwitchProps {
  id: string;
  name?: string;
  value?: string;
  sizeSwitch?: SwitchSizeType;
  checked?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  margin: string;
  padding: string;
  disabled?: boolean;
}

const Switch = (props: SwitchProps) => {
  const {
    disabled = false,
    id,
    name,
    value,
    sizeSwitch = "small",
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
      <StyledContainer sizeSwitch={sizeSwitch}>
        <StyledInput
          id={id}
          type="checkbox"
          value={value}
          sizeSwitch={sizeSwitch}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
        />
        <StyledSpan sizeSwitch={sizeSwitch} disabled={disabled} checked={checked}>
          {checked ? (
            <StyledIcon checked={checked} sizeSwitch={sizeSwitch} disabled={disabled}>
              <MdDone />
            </StyledIcon>
          ) : (
            <StyledIcon checked={checked} sizeSwitch={sizeSwitch} disabled={disabled}>
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