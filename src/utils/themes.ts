/* eslint-disable @typescript-eslint/no-explicit-any */

type Palette = Record<string, Record<string, string>>;

interface IColor {
  palette: Palette;
  stroke: Record<string, Record<string, string>>;
  surface: Record<string, Record<string, string>>;
  text: Record<string, Record<string, string>>;
}

interface IThemeData {
  color: IColor;
  [key: string]: any;
}

const resolveColor = (path: string, palette: Palette): string => {
  const keys = path.split(".");
  let value: any = palette;
  for (const key of keys) {
    if (!value[key]) {
      throw new Error(`Path ${path} is invalid.`);
    }
    value = value[key];
  }
  return value;
};

const replaceColorReferences = (obj: any, data: IThemeData): any => {
  if (typeof obj === "string") {
    const regex = /^palette\.(.+)$/;
    const match = obj.match(regex);
    if (match) {
      return resolveColor(match[1], data.color.palette);
    }
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => replaceColorReferences(item, data));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      newObj[key] = replaceColorReferences(obj[key], data);
    }
    return newObj;
  }
  return obj;
};

const resolveThemeColors = (jsonData: IThemeData): IThemeData => {
  return replaceColorReferences(jsonData, jsonData);
};

export { resolveThemeColors };
