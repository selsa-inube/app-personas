import { useState } from "react";
import { BreadcrumbLink, IBreadcrumbLinkProps } from "..";

const BreadcrumbLinkController = (props: IBreadcrumbLinkProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClickTab = () => {
    setIsActive(true);
  };

  return (
    <BreadcrumbLink
      {...props}
      isActive={isActive}
      handleClick={handleClickTab}
    />
  );
};

export { BreadcrumbLinkController };
