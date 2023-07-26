import { Text } from "../Text";

import { appearance } from "./props";

import { StyledTag } from "./styles";
import { AppearanceType } from "../../../types/color.types";

const darkTextAppearances = ["warning", "gray", "light"];

interface TagProps{
  label:string;
  appearance:AppearanceType;
}

function Tag(props: TagProps) {
  const { label, appearance = "gray" } = props;

  return (
    <StyledTag appearance={appearance}>
      <Text
        type="label"
        size="small"
        appearance={darkTextAppearances.includes(appearance) ? "dark" : "light"}
      >
        {label}
      </Text>
    </StyledTag>
  );
}


export { Tag };
export type {TagProps};
