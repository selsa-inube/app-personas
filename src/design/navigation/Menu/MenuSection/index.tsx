import { inube } from "@design/tokens";
import { MenuHeading } from "../MenuHeading";
import { MenuItem } from "../MenuItem";
import { MenuItemSpacingType } from "../MenuItem/types";
import { ISection } from "./types";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";

interface MenuSectionProps {
  sections: ISection[];
  spacing?: MenuItemSpacingType;
}

function MenuSection(props: MenuSectionProps) {
  const { sections, spacing = "wide" } = props;

  return (
    <>
      {sections.map((section, index) => (
        <Stack key={index} width="312px" direction="column">
          {section.divider && (
            <Stack key={index} width="280px" margin="auto" direction="column">
              <Divider />
            </Stack>
          )}

          {section.title && <MenuHeading title={section.title} />}
          <Stack
            direction="column"
            gap={spacing === "compact" ? inube.spacing.s050 : inube.spacing.s0}
            margin={`${inube.spacing.s075} ${inube.spacing.s0}`}
          >
            {section.links.map((link, linkIndex) => (
              <MenuItem
                key={linkIndex}
                title={link.title}
                description={link.description}
                iconBefore={link.iconBefore}
                iconAfter={link.iconAfter}
                isDisabled={link.isDisabled}
                path={link.path}
                onClick={link.onClick}
                spacing={spacing}
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export { MenuSection };
export type { MenuSectionProps };
