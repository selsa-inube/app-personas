import { MdOutlineClose } from "react-icons/md";

import { StyledTag } from "./styles";
import { TagAppearanceType, TagModifierType } from "./types";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

const darkTextAppearances = ["warning", "gray", "light"];

interface TagProps {
  label: string;
  id?: string;
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
    <StyledTag $appearance={appearance} $modifier={modifier}>
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
          spacing="narrow"
          cursorHover
          onClick={onRemove}
        />
      )}
    </StyledTag>
  );
}

export { Tag };
export type { TagProps };
