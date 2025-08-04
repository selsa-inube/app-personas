import { useEffect, useMemo } from "react";

interface IFonts {
  family: string;
  url: string;
  options: IOptions;
}

interface IOptions {
  weight: string;
  style: string;
}

type FontsListType = IFonts[];

function useFonts(fonts: FontsListType | undefined) {
  const fontFaces = useMemo(
    () =>
      (fonts ?? []).map(
        (font) => new FontFace(font.family, `url(${font.url})`, font.options),
      ),
    [fonts],
  );

  async function loadFontFace(fontFace: FontFace) {
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
  }

  useEffect(() => {
    if (!fonts || fonts.length === 0) return;
    fontFaces.forEach((fontFace, index: number) => {
      loadFontFace(fontFace);
      if (index === 1) {
        document.body.style.fontFamily = fontFace.family;
      }
    });
  }, [fontFaces, fonts]);
}

export { useFonts };
export type { FontsListType };
