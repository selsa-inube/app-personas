import { IThemeData, resolveThemeColors } from "src/utils/themes";
import fondecom from "./fondecom.json";
import feproteccion from "./feproteccion.json";

const themes: Record<string, IThemeData> = {
  fondecom: resolveThemeColors(fondecom),
  feproteccion: resolveThemeColors(feproteccion),
};

export { themes };
