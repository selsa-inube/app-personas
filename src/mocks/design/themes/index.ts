import { IThemeData, resolveThemeColors } from "src/utils/themes";
import fondecom from "./fondecom.json";
import proteccion from "./proteccion.json";

const themes: Record<string, IThemeData> = {
  fondecom: resolveThemeColors(fondecom),
  proteccion: resolveThemeColors(proteccion),
};

export { themes };
