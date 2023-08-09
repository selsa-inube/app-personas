import { useMediaQuery } from "@hooks/useMediaQuery";

import { BreadcrumbLink } from "../BreadcrumbLink";
import { BreadcrumbEllipsis } from "../BreadcrumbEllipsis";

import { StyledBreadcrumbs } from "./styles";
import { SizeVariantType } from "@ptypes/design.types";
import { IBreadcrumbItem } from "./types";

interface BreadcrumbsProps {
  crumbs: IBreadcrumbItem[];
}

function capitalizeString(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Breadcrumbs(props: BreadcrumbsProps) {
  const { crumbs } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const maxCrumbs = isDesktop ? 5 : 3;

  const transformedSize: SizeVariantType = isDesktop ? "large" : "small";

  if (crumbs.length > maxCrumbs) {
    const transformedLastElement = crumbs[crumbs.length - 1];
    return (
      <StyledBreadcrumbs>
        <BreadcrumbLink
          key={crumbs[0].path}
          path={crumbs[0].path}
          id={crumbs[0].path}
          label={capitalizeString(crumbs[0].label)}
          isActive={crumbs[0].isActive}
          cursorHover={true}
        />
        <BreadcrumbEllipsis
          key={`breadcrumb-ellipsis`}
          size={transformedSize}
          routes={crumbs.slice(1, -1)}
          cursorHover={true}
        />
        <BreadcrumbLink
          key={transformedLastElement.path}
          path={transformedLastElement.path}
          id={transformedLastElement.path}
          label={capitalizeString(transformedLastElement.label)}
          isActive={transformedLastElement.isActive}
          cursorHover={true}
        />
      </StyledBreadcrumbs>
    );
  }

  return (
    <StyledBreadcrumbs>
      {crumbs.map(({ path, label, isActive }) => (
        <BreadcrumbLink
          key={path}
          path={path}
          id={path}
          label={capitalizeString(label)}
          isActive={isActive}
          cursorHover={true}
        />
      ))}
    </StyledBreadcrumbs>
  );
}

export type { BreadcrumbsProps, IBreadcrumbItem };
export { Breadcrumbs };
