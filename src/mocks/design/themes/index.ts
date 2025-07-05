import { IThemeData, resolveThemeColors } from "src/utils/themes";
import coopebis from "./coopebis.json";
import cooptraiss from "./cooptraiss.json";
import febanc from "./febanc.json";
import feproteccion from "./feproteccion.json";
import fondecom from "./fondecom.json";
import grancoop from "./grancoop.json";
import prosel from "./prosel.json";

const themes: Record<string, IThemeData> = {
  fondecom: resolveThemeColors(fondecom),
  feproteccion: resolveThemeColors(feproteccion),
  cooptraiss: resolveThemeColors(cooptraiss),
  coopebis: resolveThemeColors(coopebis),
  grancoop: resolveThemeColors(grancoop),
  prosel: resolveThemeColors(prosel),
  febanc: resolveThemeColors(febanc),
};

export { themes };
