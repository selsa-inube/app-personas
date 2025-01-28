import { cooservunal } from "@mocks/design/themes/cooservunal";
import { corbanca } from "@mocks/design/themes/corbanca";
import { presente } from "@mocks/design/themes/presente";
import { resolveThemeColors } from "src/utils/themes";
import fondecom from "./fondecom.json";

const themes = {
  fondecom: resolveThemeColors(fondecom),
  presente,
  cooservunal,
  corbanca,
};

export { themes };
