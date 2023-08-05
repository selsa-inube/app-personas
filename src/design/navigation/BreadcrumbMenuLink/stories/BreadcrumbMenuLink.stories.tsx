import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { BreadcrumbMenuLink, IBreadcrumbMenuLinkProps } from "..";
import { props } from "../props";

const story = {
  title: "design/navigation/BreadcrumbMenuLink",
  components: [BreadcrumbMenuLink],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = (args: IBreadcrumbMenuLinkProps) => (
  <BreadcrumbMenuLink {...args} />
);
Default.args = {
  label: "Privileges",
  path: "/privileges",
  id: "privileges",
  typo: "large",
};

export const Themed = (args: IBreadcrumbMenuLinkProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbMenuLink {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
