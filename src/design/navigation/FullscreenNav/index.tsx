import { INav } from "@design/layout/Page/types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { MdMenu } from "react-icons/md";
import { IHeaderLink } from "../Header/types";
import { FullscreenMenu } from "./FullscreenMenu";
import { StyledContDropMenu } from "./styles";

interface FullscreenNavProps {
  portalId: string;
  logoutTitle: string;
  navigation: INav;
  links?: IHeaderLink[];
}

function FullscreenNav(props: FullscreenNavProps) {
  const { portalId, logoutTitle, navigation, links } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const node = document.getElementById(portalId);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <StyledContDropMenu>
        <MdMenu onClick={() => setIsMenuOpen(true)} />
      </StyledContDropMenu>
      {isMenuOpen &&
        node &&
        createPortal(
          <FullscreenMenu
            onClose={handleClose}
            logoutTitle={logoutTitle}
            navigation={navigation}
            links={links}
          />,
          node,
        )}
    </>
  );
}

export { FullscreenNav };
export type { FullscreenNavProps };
