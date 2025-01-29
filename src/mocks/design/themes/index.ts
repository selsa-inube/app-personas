import { cooservunal } from "@mocks/design/themes/cooservunal";
import { corbanca } from "@mocks/design/themes/corbanca";
import { presente } from "@mocks/design/themes/presente";
import { resolveThemeColors } from "src/utils/themes";
import fondecom from "./fondecom.json";
import proteccion from "./proteccion.json";

const themes = {
  fondecom: resolveThemeColors(fondecom),
  proteccion: resolveThemeColors(proteccion),
  presente,
  cooservunal,
  corbanca,
};

export { themes };
