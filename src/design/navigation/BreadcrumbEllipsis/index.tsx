import { useState, useEffect, useRef } from "react";

import { BreadcrumbMenu } from "../BreadcrumbMenu";
import { Text } from "@design/data/Text";

import {
  StyledContainerEllipsis,
  StyledBreadcrumbEllipsis,
  StyledRelativeContainer,
} from "./styles";
import { Typos } from "./props";

export interface IRoute {
  label: string;
  path: string;
  id: string;
}

export interface IBreadcrumbEllipsisProps {
  size?: Typos;
  routes: IRoute[];
  cursorHover?: boolean;
}

const defaultTypo = "large";

const BreadcrumbEllipsis = (props: IBreadcrumbEllipsisProps) => {
  const { size = defaultTypo, routes, cursorHover = false } = props;
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

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
};

export { BreadcrumbEllipsis };
