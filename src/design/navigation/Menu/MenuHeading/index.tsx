import { Text } from "@inubekit/text";
import { inube } from "@design/tokens";

interface MenuHeadingProps {
  title: string;
}

function MenuHeading(props: MenuHeadingProps) {
  const { title } = props;

  return (
    <Text
      type="title"
      size="small"
      appearance="gray"
      padding={`${inube.spacing.s100} ${inube.spacing.s200} ${inube.spacing.s100} ${inube.spacing.s200}`}
    >
      {title}
    </Text>
  );
}

export { MenuHeading };
export type { MenuHeadingProps };
