import { useState } from "react";
import { BreadcrumbLink, BreadcrumbLinkProps } from "..";

const BreadcrumbLinkController = (props: BreadcrumbLinkProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClickTab = () => {
    setIsActive(true);
  };

  return (
    <BreadcrumbLink {...props} isActive={isActive} onClick={handleClickTab} />
  );
};

export { BreadcrumbLinkController };
