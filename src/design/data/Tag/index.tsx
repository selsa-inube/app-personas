import { MdOutlineClose } from "react-icons/md";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { StyledTag } from "./styles";
import { TagAppearanceType, TagModifierType } from "./types";

const darkTextAppearances = ["warning", "gray", "light"];

interface TagProps {
  label: string;
  appearance?: TagAppearanceType;
  textAppearance?: TagAppearanceType;
  modifier?: TagModifierType;
  removable?: boolean;
  onRemove?: () => void;
}

function Tag(props: TagProps) {
  const {
    label,
    appearance = "gray",
    modifier = "regular",
    textAppearance,
    removable,
    onRemove,
  } = props;

  return (
    <StyledTag appearance={appearance} modifier={modifier}>
      <Text
        type="label"
        size="small"
        appearance={
          textAppearance
            ? textAppearance
            : darkTextAppearances.includes(appearance)
              ? "dark"
              : "light"
        }
      >
        {label}
      </Text>
      {removable && (
        <Icon
          appearance={
            textAppearance
              ? textAppearance
              : darkTextAppearances.includes(appearance)
                ? "dark"
                : "light"
          }
          icon={<MdOutlineClose />}
          size="12px"
          spacing="none"
          cursorHover
          onClick={onRemove}
        />
      )}
    </StyledTag>
  );
}

export { Tag };
export type { TagProps };
