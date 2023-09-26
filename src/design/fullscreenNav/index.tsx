import { useState } from "react";
import { createPortal } from "react-dom";
import { MdMenu } from "react-icons/md";
import { StyledContDropMenu } from "./styles";
import { FullscreenMenu } from "./FullscreenMenu";
import { INavigation } from "./types";

interface FullScreenNavProps {
  portalId: string;
  logoutPath: string;
  logoutTitle: string;
  navigation: INavigation;
}

function FullScreenNav(props: FullScreenNavProps) {
  const { portalId, logoutPath, logoutTitle, navigation } = props;
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
      {isMenuOpen && node && (
        createPortal(
          <FullscreenMenu
            onClose={handleClose}
            logoutPath={logoutPath}
            logoutTitle={logoutTitle}
            navigation={navigation}
          />,
          node
        )
      )}
    </>
  );
}

export { FullScreenNav };
export type { FullScreenNavProps };
