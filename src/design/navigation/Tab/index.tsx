import { Text } from "@design/data/Text";
import { StyledTab } from "./styles";

interface ITabProps {
  label: string;
  id: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

function Tab(props: ITabProps) {
  const { isDisabled = false, isSelected = false, id, label, onClick } = props;

  const handleClick = () => {
    if (onClick && !isDisabled) {
      onClick();
    }
  };

  return (
    <StyledTab
      isDisabled={isDisabled}
      isSelected={isSelected}
      id={id}
      onClick={handleClick}
    >
      <Text
        type="label"
        size="medium"
        appearance={isSelected ? "primary" : "dark"}
        disabled={isDisabled}
      >
        {label}
      </Text>
    </StyledTab>
  );
}

export type { ITabProps };
export { Tab };
