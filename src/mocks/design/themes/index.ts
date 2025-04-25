import { IThemeData, resolveThemeColors } from "src/utils/themes";
import coopebis from "./coopebis.json";
import cooptraiss from "./cooptraiss.json";
import feproteccion from "./feproteccion.json";
import fondecom from "./fondecom.json";

const themes: Record<string, IThemeData> = {
  fondecom: resolveThemeColors(fondecom),
  feproteccion: resolveThemeColors(feproteccion),
  cooptraiss: resolveThemeColors(cooptraiss),
  coopebis: resolveThemeColors(coopebis),
};

export { themes };
