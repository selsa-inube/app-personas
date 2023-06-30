import { useFonts } from "../src/hooks/useFonts";
import { fondecom } from "../src/mocks/theme";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const theme = {
        ...fondecom,
      };

      useFonts(theme.typography.fonts);

      return <Story />;
    },
  ],
};

export default preview;
