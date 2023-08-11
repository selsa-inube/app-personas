import { useEffect, useRef, useState } from "react";

import { Text } from "@design/data/Text";
import { BreadcrumbMenu } from "../BreadcrumbMenu";

import { IRoute } from "@ptypes/navigation.types";
import {
  StyledBreadcrumbEllipsis,
  StyledContainerEllipsis,
  StyledRelativeContainer,
} from "./styles";
import { BreadcrumbEllipsisSizeType } from "./types";

interface BreadcrumbEllipsisProps {
  size?: BreadcrumbEllipsisSizeType;
  routes: IRoute[];
  cursorHover?: boolean;
}

function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  const { size = "large", routes, cursorHover = false } = props;
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const closeEllipsisMenu = (event: globalThis.MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeEllipsisMenu);

    return () => {
      document.removeEventListener("click", closeEllipsisMenu);
    };
  }, [containerRef]);

  const toggleEllipsisMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <StyledRelativeContainer ref={containerRef} onClick={toggleEllipsisMenu}>
      <StyledContainerEllipsis>
        <Text type="label" size={size} appearance="dark">
          <StyledBreadcrumbEllipsis cursorHover={cursorHover}>
            ...
          </StyledBreadcrumbEllipsis>
        </Text>
      </StyledContainerEllipsis>
      {showMenu && <BreadcrumbMenu routes={routes} />}
    </StyledRelativeContainer>
  );
}

export { BreadcrumbEllipsis };
export type { BreadcrumbEllipsisProps };
