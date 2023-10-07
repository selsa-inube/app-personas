import { useState } from "react";
import { Stack } from "@design/layout/Stack";
import { Label } from "../Label";
import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledContainer, StyledTextarea } from "./styles";

interface ITextareaProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  isFocused?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  required?: boolean;
  fullwidth?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const Counter = (
  props: Omit<ITextareaProps, "id"> & {
    valueLength: number;
  }
) => {
  const { maxLength, disabled, valueLength } = props;

  return (
    <Text
      type="body"
      size="small"
      appearance="gray"
      disabled={disabled}
    >{`${valueLength}/${maxLength}`}</Text>
  );
};

const Textarea = (props: ITextareaProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled,
    value = "",
    maxLength = 0,
    required,
    fullwidth,
    onChange,
    onFocus,
    onBlur,
    readOnly,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const newValue = value.slice(0, maxLength);

  const isMobile = useMediaQuery("(max-width: 560px)");

  const interceptFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    if (typeof onFocus === "function") {
      onFocus(e);
    }
  };

  const interceptBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (typeof onBlur === "function") {
      onBlur(e);
    }
  };

  return (
    <StyledContainer isFullwidth={fullwidth} isDisabled={disabled}>
      <Stack width="100%" margin={`0px 0px ${inube.spacing.s050} 0px`}>
        {(label || required) && (
          <Stack
            gap="4px"
            alignItems="center"
            padding={`0px 0px 0px ${inube.spacing.s200}`}
          >
            {label && (
              <Label
                htmlFor={id}
                isDisabled={disabled}
                isFocused={isFocused}
                size={isMobile ? "medium" : "large"}
              >
                {label}
              </Label>
            )}

            {required && !disabled && (
              <Text type="body" size="small" appearance="dark">
                (Requerido)
              </Text>
            )}
          </Stack>
        )}
        {!disabled && (
          <Stack justifyContent="flex-end" alignItems="center" width="100%">
            <Counter
              maxLength={maxLength}
              disabled={disabled}
              valueLength={newValue!.length}
            />
          </Stack>
        )}
      </Stack>

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        isFullwidth={fullwidth}
        isFocused={isFocused}
        readOnly={readOnly}
        value={newValue}
        isMobile={isMobile}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
      />
    </StyledContainer>
  );
};

export type { ITextareaProps };
export { Textarea };
