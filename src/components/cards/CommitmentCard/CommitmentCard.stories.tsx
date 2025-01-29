import { ThemeProvider } from "styled-components";
import { parameters, props } from "./props";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { CommitmentCard, CommitmentCardProps } from ".";

const story = {
  title: "components/cards/CommitmentCard",
  components: [CommitmentCard],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<CommitmentCardProps> = (args) => (
  <CommitmentCard {...args} />
);

export const WhitTag: StoryFn<CommitmentCardProps> = (args) => (
  <CommitmentCard {...args} />
);

export const Themed: StoryFn<CommitmentCardProps> = (args) => (
  <ThemeProvider theme={themes[enviroment.BUSINESS_UNIT]}>
    <CommitmentCard {...args} />
  </ThemeProvider>
);

Default.args = {
  title: "Product name",
  onClick: action("Icon MdOpenInNew Clicked"),
  attributes: [
    { id: "1", label: "Attribute 1", value: "Value 1" },
    { id: "2", label: "Attribute 2", value: "Value 2" },
  ],
};

WhitTag.args = {
  ...Default.args,
  tag: {
    label: "Text",
    appearance: "danger",
  },
};

Themed.args = {
  ...Default.args,
};

export default story;
