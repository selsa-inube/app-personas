import { useMediaQuery } from "@hooks/useMediaQuery";
import { SpacingType } from "@ptypes/design.types";

interface BoxAttributeProps {
  label: string;
  icon?: React.JSX.Element;
  value: string;
  iconSpacing?: SpacingType;
}

function BoxAttribute(props: BoxAttributeProps) {
    const { label, icon, value, iconSpacing } = props;

    const smallScreen = useMediaQuery

    return (
        <></>
    )
}

export { BoxAttribute };
export type { BoxAttributeProps };
