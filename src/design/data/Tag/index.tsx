import { Text } from "../Text";

import { StyledTag } from "./styles";
import { TagAppearanceType, TagModifierType } from "./types";

const darkTextAppearances = ["warning", "gray", "light"];

interface TagProps {
  label: string;
  appearance?: TagAppearanceType;
  textAppearance?: TagAppearanceType;
  modifier?: TagModifierType;
}

function Tag(props: TagProps) {
  const {
    label,
    appearance = "gray",
    modifier = "regular",
    textAppearance,
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
    </StyledTag>
  );
}

export { Tag };
export type { TagProps };
