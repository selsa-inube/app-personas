import { RefObject } from "react";
import { MdExpandMore, MdOutlineWarning } from "react-icons/md";

import { SelectProps } from ".";
import { Text } from "../../data/Text";
import { DropdownMenu } from "../DropdownMenu";
import { Label } from "../Label";
import { ISelectMessage } from "./types";

import {
  StyledContainer,
  StyledContainerLabel,
  StyledErrorMessageContainer,
  StyledIcon,
  StyledInput,
  StyledInputContainer,
} from "./styles";
import { Stack } from "@design/layout/Stack";

function Invalid(props: ISelectMessage) {
  const { isDisabled, state, errorMessage } = props;

  return (
    <StyledErrorMessageContainer isDisabled={isDisabled} state={state}>
      <MdOutlineWarning />
      <Text type="body" size="small" appearance="error" disabled={isDisabled}>
        {errorMessage}
      </Text>
    </StyledErrorMessageContainer>
  );
}

interface SelectUIProps extends SelectProps {
  isFocused?: boolean;
  openOptions: boolean;
  selectRef?: RefObject<HTMLDivElement> | null;
  onToggleOptions: () => void;
  onOptionClick: (id: string) => void;
}

function SelectUI(props: SelectUIProps) {
  const {
    label,
    name,
    id,
    placeholder,
    isDisabled = false,
    isFullWidth = false,
    isFocused = false,
    isRequired,
    state = "pending",
    size = "compact",
    errorMessage,
    options,
    openOptions,
    value,
    selectRef,
    readOnly = false,
    isTouched,
    onFocus,
    onBlur,
    onClick,
    onToggleOptions,
    onOptionClick,
  } = props;

  const currentOption = options?.find((option) => option.id === value);

  return (
    <StyledContainer
      id={id}
      tabIndex={0}
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      ref={selectRef}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <StyledContainerLabel alignItems="center" isDisabled={isDisabled}>
        {label && (
          <Label
            htmlFor={id}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isInvalid={state === "invalid"}
            size="medium"
          >
            {label}
          </Label>
        )}

        {isRequired && !isDisabled && (
          <Text type="body" size="small" appearance="dark">
            (Requerido)
          </Text>
        )}
      </StyledContainerLabel>

      <StyledInputContainer
        isDisabled={isDisabled}
        isFocused={isFocused}
        state={state}
        readOnly={readOnly}
      >
        <StyledInput
          autoComplete="off"
          $readOnly={readOnly}
          readOnly
          value={currentOption?.value || ""}
          name={name}
          id={id}
          placeholder={placeholder}
          isDisabled={isDisabled}
          required={isRequired}
          state={state}
          isFullWidth={isFullWidth}
          isFocused={isFocused}
          $size={size}
        />

        {!readOnly && (
          <StyledIcon isDisabled={isDisabled} readOnly={readOnly}>
            <MdExpandMore />
          </StyledIcon>
        )}
      </StyledInputContainer>

      {openOptions && !isDisabled && !readOnly && (
        <Stack>
          <DropdownMenu
            options={options}
            onClick={onOptionClick}
            onCloseOptions={onToggleOptions}
          />
        </Stack>
      )}

      {state === "invalid" && isTouched && !openOptions && (
        <Invalid
          isDisabled={isDisabled}
          state={state}
          errorMessage={errorMessage}
        />
      )}
    </StyledContainer>
  );
}

export { SelectUI };
export type { SelectUIProps };
