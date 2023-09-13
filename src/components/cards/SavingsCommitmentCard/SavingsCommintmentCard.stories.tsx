import { ThemeProvider } from "styled-components";
import { props, parameters } from "./props";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { SavingsCommitmentCard, SavingsCommitmentCardProps } from ".";
import { action } from "@storybook/addon-actions";

const story = {
  title: "components/cards/SavingsCommitmentCard",
  components: [SavingsCommitmentCard],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<SavingsCommitmentCardProps> = (args) => (
  <SavingsCommitmentCard {...args} />
);

export const WhitTag: StoryFn<SavingsCommitmentCardProps> = (args) => (
  <SavingsCommitmentCard {...args} />
);

export const Themed: StoryFn<SavingsCommitmentCardProps> = (args) => (
  <ThemeProvider theme={themes["fondecom"]}>
    <SavingsCommitmentCard {...args} />
  </ThemeProvider>
);

Default.args = {
  title: "Product name",
  value: 8900,
  onClick: action("Icon MdOpenInNew Clicked"),
  descriptionLabel: "Description",
  descriptionValue: "value",
  label: "label",
};

WhitTag.args = {
  ...Default.args,
  tagValue: {
    label: "Tag",
    appearance: "error",
  },
};

Themed.args = {
  ...Default.args,
};

export default story;
