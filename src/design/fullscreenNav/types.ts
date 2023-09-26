interface ILink {
    id: string;
    label: string;
    icon: React.JSX.Element;
    path: string;
}

interface ISection {
  name: string;
  links: { [key: string]: ILink };
}

interface IMenuSectionsProps {
  navigation: INavigation;
}

interface INavigation {
  title: string;
  sections: { [key: string]: ISection };
}

export type { ILink, ISection, INavigation, IMenuSectionsProps };
