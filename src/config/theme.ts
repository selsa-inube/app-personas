import { themes } from "@mocks/design/themes";
import { enviroment } from "./enviroment";

const theme = {
  ...(themes[enviroment.BUSINESS_UNIT] || themes.prosel),
};
console.log(!!themes[enviroment.BUSINESS_UNIT]);
export { theme };
