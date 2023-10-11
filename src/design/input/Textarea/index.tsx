import { useState } from "react";
import { Stack } from "@design/layout/Stack";
import { Label } from "../Label";
import { Text } from "@design/data/Text";
import { inube } from "@design/tokens";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { StyledContainer, StyledTextarea } from "./styles";

interface TextareaProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  isRequired?: boolean;
  isFullWidth?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const Counter = (
  props: Omit<TextareaProps, "id"> & {
    valueLength: number;
  }
) => {
  const { maxLength, isDisabled, valueLength } = props;

  return (
    <Text type="body" size="small" appearance="gray" disabled={isDisabled}>
      {valueLength}/{maxLength}
    </Text>
  );
};

const Textarea = (props: TextareaProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled,
    value = "",
    maxLength = 0,
    isRequired,
    isFullWidth,
    onChange,
    onFocus,
    onBlur,
    readOnly,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const truncatedValue = value.slice(0, maxLength);

  const isMobile = useMediaQuery("(max-width: 560px)");

  const interceptFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    onFocus && onFocus(e);
  };

  const interceptBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <StyledContainer isFullwidth={isFullWidth} isDisabled={isDisabled}>
      <Stack width="100%" margin={`0px 0px ${inube.spacing.s050} 0px`}>
        {(label || isRequired) && (
          <Stack
            gap="4px"
            alignItems="center"
            padding={`0px 0px 0px ${inube.spacing.s200}`}
          >
            {label && (
              <Label
                htmlFor={id}
                isDisabled={isDisabled}
                isFocused={isFocused}
                size={isMobile ? "medium" : "large"}
              >
                {label}
              </Label>
            )}

            {isRequired && !isDisabled && (
              <Text type="body" size="small" appearance="dark">
                (Requerido)
              </Text>
            )}
          </Stack>
        )}
        {!isDisabled && (
          <Stack justifyContent="flex-end" alignItems="center" width="100%">
            <Counter
              maxLength={maxLength}
              isDisabled={isDisabled}
              valueLength={truncatedValue!.length}
            />
          </Stack>
        )}
      </Stack>

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isFullwidth={isFullWidth}
        isFocused={isFocused}
        readOnly={readOnly}
        value={truncatedValue}
        isMobile={isMobile}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
      />
    </StyledContainer>
  );
};

export type { TextareaProps };
export { Textarea };
