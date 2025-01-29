import { INav } from "@design/layout/Page/types";
import { IHeaderLink } from "@design/navigation/Header/types";
import { NavLink } from "@design/navigation/NavLink";
import { Stack } from "@inubekit/inubekit";

interface OneSectionProps {
  navigation: INav;
  links?: IHeaderLink[];
  onClose: () => void;
}

function OneSection(props: OneSectionProps) {
  const { navigation, onClose } = props;
  const sectionValue = Object.values(navigation.sections)[0];

  return (
    <Stack direction="column">
      {Object.values(sectionValue.links).map((linkValue) => (
        <NavLink
          key={linkValue.label}
          icon={linkValue.icon}
          path={linkValue.path}
          onClick={onClose}
        >
          {linkValue.label}
        </NavLink>
      ))}
    </Stack>
  );
}

export { OneSection };
