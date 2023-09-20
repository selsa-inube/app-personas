import { DropdownItem, DropdownItemProps } from "../DropdownItem";
import { StyledDropdownMenu } from "./styles";

interface DropdownMenuProps {
  options?: DropdownItemProps[];
  handleClick?: (id: string) => void;
  onCloseOptions?: () => void;
}

function DropdownMenu(props: DropdownMenuProps) {
  const { options, handleClick, onCloseOptions } = props;

  const handleOptionClick = (id: string) => {
    if (handleClick) handleClick(id);

    if (onCloseOptions) onCloseOptions();
  };

  return (
    <StyledDropdownMenu>
      {options &&
        options.map((dropDownItem) => (
          <DropdownItem
            key={dropDownItem.id}
            id={dropDownItem.id}
            isDisabled={dropDownItem.isDisabled}
            isFocused={dropDownItem.isFocused}
            handleClick={() => handleOptionClick(dropDownItem.id)}
            value={dropDownItem.value}
          />
        ))}
    </StyledDropdownMenu>
  );
}

export { DropdownMenu };
export type { DropdownMenuProps };
