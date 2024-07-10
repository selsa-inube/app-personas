import { color } from "./color/color";
import { typography } from "./typography/typography";
import * as fondecomTheme from "./fondecom";

const fondecom = {
  color,
  typography,
  ...fondecomTheme,
};

export { fondecom };
