import { BoxAttribute } from "@components/cards/BoxAttribute";
import { inube } from "@design/tokens";
import { Grid } from "@inubekit/inubekit";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";
import { Accordion, AccordionProps } from "..";

const decorators: Decorator[] = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

const story = {
  component: [Accordion],
  title: "design/data/Accordion",
  decorators,
};

const Template: StoryFn<AccordionProps> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Accordion",
  children: (
    <Grid
      templateColumns="1fr"
      gap={inube.spacing.s100}
      width="100%"
      autoRows="true"
    >
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
    </Grid>
  ),
};

export default story;
