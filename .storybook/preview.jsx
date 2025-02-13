import { enviroment } from "@config/enviroment";
import { useFonts } from "@hooks/useFonts";
import { themes } from "@mocks/design/themes";

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
  },
  decorators: [
    (Story) => {
      const theme = {
        ...themes[enviroment.BUSINESS_UNIT],
      };

      useFonts(theme.typography.fonts);

      return <Story />;
    },
  ],
};

export default preview;
