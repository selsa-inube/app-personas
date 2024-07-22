import { BoxAttribute } from "@components/cards/BoxAttribute";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Accordion, AccordionProps } from "..";
import { Grid } from "@inubekit/grid";
import { inube } from "@design/tokens";

const story = {
  component: [Accordion],
  title: "design/data/Accordion",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AccordionProps> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Accordion",
  children: (
    <Grid templateColumns="1fr" gap={inube.spacing.s100} width="100%">
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
      <BoxAttribute label="Label" value="Value" />
    </Grid>
  ),
};

export default story;
