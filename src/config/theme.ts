import { themes } from "@mocks/design/themes";
import { resolveThemeColors } from "@utils/themes";
import { enviroment } from "./enviroment";

const theme = {
  ...resolveThemeColors(themes[enviroment.BUSINESS_UNIT] || themes.prosel),
};

export { theme };
