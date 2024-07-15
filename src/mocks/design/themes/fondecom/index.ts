import { color } from "./color/color";
import { typography } from "./typography/typography";
import { fondecomTheme } from "./fondecom";

const fondecom = {
  color,
  typography,
  ...fondecomTheme,
};

export { fondecom };
