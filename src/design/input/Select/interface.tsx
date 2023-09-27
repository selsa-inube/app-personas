import { RefObject } from "react";
import { MdExpandMore, MdOutlineError } from "react-icons/md";

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

function Invalid(props: ISelectMessage) {
  const { isDisabled, state, errorMessage } = props;
  const transformedErrorMessage = errorMessage && `(${errorMessage})`;

  return (
    <StyledErrorMessageContainer isDisabled={isDisabled} state={state}>
      <MdOutlineError />
      <Text type="body" size="small" appearance="error" disabled={isDisabled}>
        {transformedErrorMessage}
      </Text>
    </StyledErrorMessageContainer>
  );
}

interface SelectUIProps extends SelectProps {
  isFocused?: boolean;
  openOptions: boolean;
  selectRef?: RefObject<HTMLDivElement> | null;
  onCloseOptions: () => void;
  handleOptionClick: (id: string) => void;
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
    handleFocus,
    handleBlur,
    options,
    openOptions,
    value,
    handleClick,
    onCloseOptions,
    selectRef,
    handleOptionClick,
    readOnly = false,
  } = props;

  const interceptorOnClick = (e: React.MouseEvent) => {
    if (handleClick) handleClick(e);

    onCloseOptions();
  };

  const currentOption = options?.find((option) => option.id === value);

  return (
    <StyledContainer
      tabIndex={0}
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      ref={selectRef}
      onClick={interceptorOnClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <StyledContainerLabel alignItems="center" isDisabled={isDisabled}>
        {label && (
          <Label
            htmlFor={id}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isInvalid={state === "invalid"}
          >
            {label}
          </Label>
        )}

        {isRequired && !isDisabled && (
          <Text type="body" size="small" appearance="dark">
            (Required)
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
          readOnly={readOnly}
          value={currentOption?.value || "Seleccione una opción"}
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

        <StyledIcon isDisabled={isDisabled} readOnly={readOnly}>
          <MdExpandMore onClick={onCloseOptions} />
        </StyledIcon>
      </StyledInputContainer>

      {openOptions && !isDisabled && !readOnly && (
        <DropdownMenu
          options={options}
          handleClick={handleOptionClick}
          onCloseOptions={onCloseOptions}
        />
      )}

      {state === "invalid" && (
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
