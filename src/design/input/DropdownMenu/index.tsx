import { DropdownItem, DropdownItemProps } from "../DropdownItem";
import { StyledDropdownMenu } from "./styles";

interface DropdownMenuProps {
  options: DropdownItemProps[];
  handleClick?: (id: string) => void;
  onCloseOptions?: () => void;
  handleSelect?: (id: string) => void;
}

function DropdownMenu(props: DropdownMenuProps) {
  const { options, handleClick, onCloseOptions, handleSelect } = props;

  const handleOptionClick = (id: string) => {
    if (typeof handleClick === "function") {
      handleClick(id);
    }

    if (typeof onCloseOptions === "function") {
      onCloseOptions();
    }

    if (typeof handleSelect === "function") {
      handleSelect(id);
    }
  };

  return (
    <StyledDropdownMenu>
      {options.map((dropDownItem) => (
        <DropdownItem
          key={dropDownItem.id}
          id={dropDownItem.id}
          isDisabled={dropDownItem.isDisabled}
          isFocused={dropDownItem.isFocused}
          handleClick={() => handleOptionClick(dropDownItem.id)}
        >
          {dropDownItem.children}
        </DropdownItem>
      ))}
    </StyledDropdownMenu>
  );
}

export { DropdownMenu };
export type { DropdownMenuProps };
