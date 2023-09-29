import { useState } from "react";
import { createPortal } from "react-dom";
import { MdMenu } from "react-icons/md";
import { StyledContDropMenu } from "./styles";
import { FullscreenMenu } from "./FullscreenMenu";
import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "../Header/types";

interface FullscreenNavProps {
  portalId: string;
  logoutPath: string;
  logoutTitle: string;
  navigation: INav;
  links?: IHeaderLink[];
}

function FullscreenNav(props: FullscreenNavProps) {
  const { portalId, logoutPath, logoutTitle, navigation, links } = props;
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
            logoutPath={logoutPath}
            logoutTitle={logoutTitle}
            navigation={navigation}
            links={links}
          />,
          node
        )}
    </>
  );
}

export { FullscreenNav };
export type { FullscreenNavProps };
