import { MenuUser } from "./MenuUser";
import { MenuSection } from "./MenuSection";
import { ISection } from "./MenuSection/types";
import { MenuItemSpacingType } from "./MenuItem/types";
import { StyledMenuContainer } from "./styles";

interface MenuProps {
  userName: string;
  sections: ISection[];
  businessUnit?: string;
  avatar?: boolean;
  spacing?: MenuItemSpacingType;
}

function Menu(props: MenuProps) {
  const { userName, businessUnit, avatar, sections, spacing } = props;

  return (
    <StyledMenuContainer>
      <MenuUser
        userName={userName}
        businessUnit={businessUnit}
        avatar={avatar}
      />
      <MenuSection sections={sections} spacing={spacing} />
    </StyledMenuContainer>
  );
}

export type { MenuProps };
export { Menu };
