import { resolveThemeColors } from "src/utils/themes";

import prosel from "./prosel.json";

const themesMock = {
  prosel: resolveThemeColors(prosel),
};

export { themesMock };
