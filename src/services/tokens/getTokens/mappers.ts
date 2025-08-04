import { IThemeData } from "@utils/themes";

const mapTokensApiToEntity = (tokens: Record<string, unknown>): IThemeData => {
  return {
    color: tokens.color as IThemeData["color"],
    typography: tokens.typography as IThemeData["typography"],
    ...tokens,
  };
};

export { mapTokensApiToEntity };
