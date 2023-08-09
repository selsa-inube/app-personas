import { Stack } from "@design/layout/Stack";
import { BreadcrumbMenuLink } from "../BreadcrumbMenuLink";
import { StyledBreadcrumbMenu } from "./styles";
import { IBreadcrumbRoute } from "./types";

interface BreadcrumbMenuProps {
  routes: IBreadcrumbRoute[];
}

function BreadcrumbMenu(props: BreadcrumbMenuProps) {
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
}

export type { BreadcrumbMenuProps, IBreadcrumbRoute };
export { BreadcrumbMenu };
