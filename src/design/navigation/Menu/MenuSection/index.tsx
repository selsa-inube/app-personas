import { MenuItem } from "../MenuItem";
import { MenuHeading } from "../MenuHeading";
import { ISection } from "./types";
import { MenuItemSpacingType } from "../MenuItem/types";
import { Divider } from "@design/layout/Divider";
import { Stack } from "@design/layout/Stack";

interface MenuSectionProps {
  sections: ISection[];
  spacing?: MenuItemSpacingType;
  divider?: boolean;
}

function MenuSection(props: MenuSectionProps) {
  const { sections, spacing = "wide", divider = false } = props;

  return (
    <>
      {sections.map((section, index) => (
        <Stack key={index} width="312px" direction="column">
          {divider && (
            <Stack key={index} width="280px" margin="auto" direction="column">
              <Divider />
            </Stack>
          )}

          {section.title && <MenuHeading title={section.title} />}
          {section.links.map((link, linkIndex) => (
            <MenuItem
              key={linkIndex}
              title={link.title}
              description={link.description}
              iconBefore={link.iconBefore}
              iconAfter={link.iconAfter}
              isDisabled={link.isDisabled}
              path={link.path}
              spacing={spacing}
            />
          ))}
        </Stack>
      ))}
    </>
  );
}

export type { MenuSectionProps };
export { MenuSection };
