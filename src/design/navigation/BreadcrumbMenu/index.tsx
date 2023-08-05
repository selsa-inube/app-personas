import { Stack } from "@design/layout/Stack";
import { BreadcrumbMenuLink } from "../BreadcrumbMenuLink";
import { StyledBreadcrumbMenu } from "./styles";

export interface IBreadcrumbRoute {
  id: string;
  path: string;
  label: string;
}

export interface IBreadcrumbMenuProps {
  routes: IBreadcrumbRoute[];
}

const BreadcrumbMenu = (props: IBreadcrumbMenuProps) => {
  const { routes } = props;

  return (
    <StyledBreadcrumbMenu>
      <Stack direction="column" justifyContent="space-between">
        {routes.map((route) => (
          <BreadcrumbMenuLink
            key={route.id}
            id={route.id}
            path={route.path}
            label={route.label}
          />
        ))}
      </Stack>
    </StyledBreadcrumbMenu>
  );
};

export { BreadcrumbMenu };
