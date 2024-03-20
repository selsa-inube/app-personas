import { MenuUser } from "./MenuUser";
import { MenuSection } from "./MenuSection";
import { ISection } from "./MenuSection/types";
import { MenuItemSpacingType } from "./MenuItem/types";
import { StyledMenuContainer } from "./styles";

interface MenuProps {
  userName: string;
  sections: ISection[];
  divider?: boolean;
  businessUnit?: string;
  avatar?: boolean;
  spacing?: MenuItemSpacingType;
}

function Menu(props: MenuProps) {
  const { userName, businessUnit, avatar, sections, spacing, divider } = props;

  return (
    <StyledMenuContainer>
      <MenuUser
        userName={userName}
        businessUnit={businessUnit}
        avatar={avatar}
      />
      <MenuSection sections={sections} spacing={spacing} divider={divider} />
    </StyledMenuContainer>
  );
}

export type { MenuProps };
export { Menu };
