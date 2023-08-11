import { useState, useRef } from "react";
import { StyledDropdownItem } from "./styles";
import { TypographySizeType, TypographyType } from "@ptypes/typography.types";
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

const defaultIsDisabled = false;
const defaultIsFocused = false;
const defaultIsSelected = false;
const defaultTypo: TypographyType = "body";
const defaultSize: TypographySizeType = "medium";

function DropdownItem(props: DropdownItemProps) {
  const {
    id,
    isDisabled = defaultIsDisabled,
    isSelected = defaultIsSelected,
    isFocused = defaultIsFocused,
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
      <Text size={defaultSize} type={defaultTypo}>
        {children}
      </Text>
    </StyledDropdownItem>
  );
}

export { DropdownItem };
export type { DropdownItemProps };
