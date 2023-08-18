import { Text } from "@design/data/Text";
import { useRef, useState } from "react";
import { StyledDropdownItem } from "./styles";

interface DropdownItemProps {
  id: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
  value: string;
  handleClick?: (id: string) => void;
  handleSelect?: (label: string) => void;
}

function DropdownItem(props: DropdownItemProps) {
  const {
    id,
    isDisabled = false,
    isSelected = false,
    isFocused = false,
    value,
    handleClick,
    handleSelect,
  } = props;

  const [select, setSelect] = useState(isSelected);
  const itemRef = useRef(null);

  const handleOptionClick = (label: string) => {
    if (isDisabled) return;
    setSelect(true);
    
    if (handleClick) handleClick(id);

    if (handleSelect) handleSelect(label);
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
      onClick={() => handleOptionClick(value)}
      ref={itemRef}
      onBlur={interceptorOnBlur}
      tabIndex={0}
    >
      <Text size="medium" type="body">
        {value}
      </Text>
    </StyledDropdownItem>
  );
}

export { DropdownItem };
export type { DropdownItemProps };
