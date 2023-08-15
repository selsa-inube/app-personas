import { useState, useRef } from "react";
import { StyledDropdownItem } from "./styles";
import { Text } from "@design/data/Text";

interface DropdownItemProps {
  id: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
  children: string;
  handleClick?: (id: string) => void;
  handleSelect?: (label: string) => void;
}

function DropdownItem(props: DropdownItemProps) {
  const {
    id,
    isDisabled = false,
    isSelected = false,
    isFocused = false,
    children,
    handleClick,
    handleSelect,
  } = props;

  const [select, setSelect] = useState(isSelected);
  const itemRef = useRef(null);

  const handleOptionClick = (label: string) => {
    setSelect(true);
    if (handleClick && typeof handleClick === "function") {
      handleClick(id);
    }
    if (handleSelect && typeof handleSelect === "function") {
      handleSelect(label);
    }
  };

  const interceptorOnBlur = () => {
    setSelect(false);
  };

  return (
    <StyledDropdownItem
      id={id}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={select}
      onClick={() => handleOptionClick(children)}
      ref={itemRef}
      onBlur={interceptorOnBlur}
      tabIndex={0}
    >
      <Text size="medium" type="body">
        {children}
      </Text>
    </StyledDropdownItem>
  );
}

export { DropdownItem };
export type { DropdownItemProps };
